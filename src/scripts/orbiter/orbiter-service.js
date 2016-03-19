/* TODO
    - array, number type
    - orbiterType messing up object selection


    APP:
        - Do lists
        - create templates

    Import libraries:
        - manual import

    Properties:
        - delete
        - Style classes
        - Global CSS
        - bind group and individual properties

    Tasks:
        - always, success, error, fail, pipe, progress promises
        - rearrange tasks
        - Create custom reusable methods

    CSS:
        - css states :hover :focus :blur
        - outline
        - cursor
        - box-shadow: breakup into arrays of objects. Example:
            [
                {
                    type: 'inset',
                    horizontal:0px,
                    vertical: 1px,
                    radius: 3px,
                    width: 0px,
                    color: (colorpicker)
                }
            ]

    Node selection:
        - blur/opacity others
        - view buttons : all(show all node borders), selected(blurs others and shows node borders), none(hide all borders)
        - handle nested elements - <node><node>text</node></node>
        - Drag to resize node

    - On property delete, find all bindings and update t default(with a warning that that is happening)
    - Walkthru
    - Undo/redo everything

*/


(function () {
    'use strict';

    function OrbiterService(InteractiveService, InteractiveProperties, InteractiveMethods, InteractiveLibraries, OrbiterElementTypes, $localStorage, $timeout){
        var equalObjects = function(obj1, obj2){
            if(obj1 === obj2){
                return true;
            }
            if(!obj1 || !obj2){
                return false;
            }

            if(Array.isArray(obj1) && Array.isArray(obj2)){
                if(obj1.length !== obj2.length){
                    return false;
                }
                for(var i=0;i<obj1.length;i++){
                    if(obj1[i] !== obj2[i]){
                        return false;
                    }
                }
                return true;
            }
            var keys1 = Object.keys(obj1);
            var keys2 = Object.keys(obj2);

            if(keys1.length !== keys2.length){
                return false;
            }
            for(var i=0;i<keys1.length;i++){
                if(keys1[i] !== keys2[i]){
                    return false;
                }
            }
            var json1 = JSON.stringify(obj1);
            var json2 = JSON.stringify(obj2);
            if(json1 !== json2){
                return false;
            }
            return true;
        }
        var self = {
            htmlTreeView: false,
            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            elementClipboard: null,
            elementTrashcan: {},

            deleteElement: function(el){
                var id = el.id;
                self.findInHtmlTree(id, 'delete');
                delete InteractiveService.properties[id];
            },

            copyElement: function(el){
                var elData = self.findInHtmlTree(el.id);
                self.elementClipboard = self.aggregateElementData(elData.element);
            },

            pasteElement: function(el){
                var paste = function(obj, parent){
                    var node = self.giveUniqueId(obj);
                    var children = node.nodes;
                    delete node.nodes;
                    var nodeIndex = parent.nodes.length;
                    parent.nodes.push({
                        id: node.id,
                        nodes: []
                    });
                    InteractiveService.properties[node.id] = node;
                    for(var n=0;n<children.length;n++){
                        paste(children[n], parent.nodes[nodeIndex]);
                    }
                };



                var elData = self.findInHtmlTree(el.id);
                if(self.elementClipboard && elData.element){
                    paste(self.elementClipboard, elData.element);
                }
            },

            moveElementUp: function(el){
                var elData = self.findInHtmlTree(el.id);
                var newIndex = elData.index ? elData.index - 1 : elData.index;
                elData.parent.nodes.splice(newIndex, 0, elData.parent.nodes.splice(elData.index, 1)[0]);
            },

            moveElementDown: function(el){
                var elData = self.findInHtmlTree(el.id);
                var newIndex = elData.index + 1;
                elData.parent.nodes.splice(newIndex, 0, elData.parent.nodes.splice(elData.index, 1)[0]);
            },

            findInHtmlTree: function(id, action){
                function findElement(obj){
                    for(var n=0;n<obj.nodes.length;n++){
                        if (obj.nodes[n].id === id){
                            if(action === 'delete'){
                                obj.nodes.splice(n, 1);
                                return InteractiveService.htmlTree;
                            }else{
                                return {parent: obj, index: n, element: obj.nodes[n]};
                            }
                        }

                        if(obj.nodes[n].nodes.length > 0){
                            return findElement(obj.nodes[n]);
                        }
                    }
                }

                return findElement(InteractiveService.htmlTree);
            },

            giveUniqueId: function(node){
                var tempNumber = 1;
                node.id = node.id || node.label;
                var oldID = node.id;
                if(InteractiveService.properties.hasOwnProperty(node.id)){
                    while(InteractiveService.properties.hasOwnProperty(node.id +' '+ tempNumber)){
                        tempNumber++;
                    }
                    node.id = node.id +' '+ tempNumber;
                }

                if(node.id !== oldID){
                    for(var p in node.properties){
                        if(node.properties[p].bind){
                            var bind = node.properties[p].bind.split('.');
                            if(bind[1] === oldID){
                                bind[1] = node.id;
                                node.properties[p].bind = bind.join('.');
                            }
                        }
                    }
                }

                return node;
            },

            aggregateElementData: function(obj){
                var newObject = angular.copy(InteractiveService.properties[obj.id]);
                newObject.nodes = angular.copy(obj.nodes);
                for(var n=0;n<newObject.nodes.length;n++){
                    newObject.nodes[n] = self.aggregateElementData(newObject.nodes[n]);
                }
                return newObject;
            },

            addToInteractive: function(parent, data){
                var node = self.giveUniqueId(data);
                node.created = new Date().getTime();
                node.orbiterType = 'element';

                for(var p in node.properties){
                    node.properties[p].bind = node.properties[p].bind ? node.properties[p].bind : 'properties.'+ node.id +'.properties.'+ p;
                }

                if(parent.id !== node.id){
                    parent.nodes.push({
                        id: node.id,
                        nodes: []
                    });

                    delete node.nodes;
                    InteractiveService.properties[node.id] = node;
                    return parent.nodes[parent.nodes.length-1];
                }
                return false;
            },

            stagedElementIdConflict: null,
            updateElementId: function(data){
                var originalID = null;
                function reset() {
                    for(var key in InteractiveService.properties){
                        if(InteractiveService.properties[key].id === data.id){
                            InteractiveService.properties[key].id = key;
                            break;
                        }
                    }
                }

                function updateElement(obj){
                    for(var n=0;n<obj.nodes.length;n++){
                        if (obj.nodes[n].id === originalID){
                            obj.nodes[n].id = data.id;
                        }

                        if(obj.nodes[n].nodes.length > 0){
                            updateElement(obj.nodes[n]);
                        }
                    }
                }

                if(!data.id){
                    self.stagedElementIdConflict = "Element name is required";
                    reset();
                }else if(data.id.indexOf('.') > -1){
                    self.stagedElementIdConflict = "Element name cannont contain periods(.)";
                    reset();
                }else if(InteractiveService.properties.hasOwnProperty(data.id) && data.created !== InteractiveService.properties[data.id].created){
                    self.stagedElementIdConflict = "There is already an element with this name";
                    reset();
                }else{
                    self.stagedElementIdConflict = null;
                    for(var key in InteractiveService.properties){
                        if(InteractiveService.properties[key].id === data.id){
                            originalID = key;

                            for(var prop in InteractiveService.properties[key].properties){
                                var bind = InteractiveService.properties[key].properties[prop].bind.split('.');
                                if(bind[0] === originalID){
                                    bind[0] = data.id;
                                    InteractiveService.properties[key].properties[prop].bind = bind.join('.');
                                }
                            }
                            break;
                        }
                    }

                    InteractiveService.properties[data.id] = InteractiveService.properties[originalID];
                    delete InteractiveService.properties[originalID];
                    updateElement(InteractiveService.htmlTree);
                    self.save();
                }
            },

            elementProperties: null,
            activeProperties: function(data){
                if(InteractiveService.elementProperties){
                    InteractiveService.elementProperties.active = false;
                }
                data.active = true;
                InteractiveService.elementProperties = data;
            },

            save: function(){
                if(!$localStorage.OrbiterInteractiveTree){
                    $localStorage.OrbiterInteractiveTree = {};
                }

                if(!$localStorage.OrbiterInteractiveProperties){
                    $localStorage.OrbiterInteractiveProperties = {};
                }

                if(!$localStorage.OrbiterInteractiveMethods){
                    $localStorage.OrbiterInteractiveMethods = {};
                }
                $localStorage.OrbiterInteractiveTree = InteractiveService.htmlTree;
                $localStorage.OrbiterInteractiveProperties = InteractiveService.properties;
                $localStorage.OrbiterInteractiveMethods = InteractiveService.methods;
            },

            spacingProperties: function(obj){
                var results = {};
                var styles = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'];
                for(var p=0;p<styles.length;p++){
                    if(obj.properties.hasOwnProperty(styles[p])){
                        var key_prop = styles[p].split('-');
                        if(!results[key_prop[0]]){
                            results[key_prop[0]] = {};
                        }
                        results[key_prop[0]][key_prop[1]] = obj.properties[styles[p]];
                    }
                }
                return results;
            },

            newDataObject: null,

            currentEventObject: null,
            currentEventObjectError: {label: null, tasks:[], taskErrors: false},
            currentEventObjectValidator: function(save){
                self.currentEventObjectError = {label: null, tasks:[], taskErrors: false};
                if(!self.currentEventObject.label && self.currentEventObject.fn.length > 0){
                    self.currentEventObjectError.label = 'Title is required';
                }

                for(var f=0;f<self.currentEventObject.fn.length;f++){
                    var errors = [];
                    if(!self.currentEventObject.fn[f].type){
                        errors.push('Type');
                    }

                    if(!self.currentEventObject.fn[f].target){
                        errors.push('Target');
                    }

                    // if(!self.currentEventObject.fn[f].action){
                    //     errors.push('Action');
                    // }
                    //
                    // if(!self.currentEventObject.fn[f].valueType){
                    //     errors.push('Value Type');
                    // }
                    //
                    // if(!self.currentEventObject.fn[f].value && self.currentEventObject.fn[f].valueType === 'property'){
                    //     errors.push('Value');
                    // }

                    if(errors.length){
                        errors = 'Missing required fields: ' + errors.join(', ');
                        self.currentEventObjectError.tasks[f] = errors;
                        self.currentEventObjectError.taskErrors = true;
                    }else{
                        self.currentEventObjectError.tasks[f] = null;
                    }
                }

                if(!self.currentEventObjectError.label && !self.currentEventObjectError.taskErrors){
                    if(save){
                        self.save();
                    }
                    self.currentEventObject = null;
                }
            },

            removeArrayElement: function(obj, index){
                return obj.splice(index, 1);
            },


            propertyDialogue: null,
            propertyMapperDialogue: null,

            mapProperties: function(element, data){
                for(var prop in data){
                    if(data[prop].new && data[prop].new !== 'none'){
                        element.properties[prop].bind = data[prop].new;
                    }else if(data[prop].new === 'none'){
                        element.properties[prop].bind = element.id +'.'+ prop;
                    }
                }
            },

            updateProperties: function(data){

            },

            stagedNewProperty: null,
            stagedPropertyErrors: false,
            buildObject: function(obj){
                obj.errors = {key:null, type:null};
                if(!obj.key){
                    self.stagedPropertyErrors = true;
                    obj.errors.key = "Property name is required";
                }

                if(!obj.type){
                    self.stagedPropertyErrors = true;
                    obj.errors.type = "Data type is required";
                    return null;
                }else if(obj.type === 'text'){
                    return obj.defaultValue;
                }else if(obj.type === 'object'){
                    var temp = {};
                    if(obj.defaultValue){
                        for(var p=0;p<obj.defaultValue.length;p++){
                            temp[obj.defaultValue[p].key] = self.buildObject(obj.defaultValue[p]);
                        }
                    }
                    return temp;
                }
            },

            insertNewProperty: function(data){
                data.errors = {key:null, type:null};
                self.stagedPropertyErrors = false;
                if(!data.key){
                    self.stagedPropertyErrors = true;
                    data.errors.key = "Property name is required";
                }else if((InteractiveService.properties.hasOwnProperty(data.key) && !data.hasOwnProperty('originalKey')) || (InteractiveService.properties.hasOwnProperty(data.key) && data.hasOwnProperty('originalKey') && data.key !== data.originalKey)){
                    self.stagedPropertyErrors = true;
                    data.errors.key = "There is already a property with this name";
                }

                if(!data.type){
                    self.stagedPropertyErrors = true;
                    data.errors.type = "Data type is required";
                }

                if(data.type === 'object'){
                    data.value = self.buildObject(data);
                }else{
                    data.value = data.defaultValue;
                }

                if(!self.stagedPropertyErrors){
                    if(data.hasOwnProperty('originalKey')){
                        delete data.originalKey;
                    }

                    data.orbiterType = 'property';
                    InteractiveService.properties[data.key] = data;
                    self.stagedNewProperty = null;
                }
            },

            editProperty: function(data){
                self.stagedNewProperty = angular.copy(data);
                self.stagedNewProperty.originalKey = angular.copy(data.key);
            },

            deleteProperty: function(parent, index){
                if(parent && index !== undefined){
                    if(Array.isArray(parent)){
                        parent.splice(index, 1);
                    }else{
                        delete parent[index];
                    }

                    if(equalObjects(parent, InteractiveService.properties)){
                        self.stagedNewProperty = null;
                        self.propertyDialogue = true;
                    }
                }
            },

            propertySelectorDialogue: null,











            newTemplate: null,
            switchTemplate: function(template){
                InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes = angular.copy(InteractiveService.htmlTree.nodes);
                InteractiveService.htmlTree.current = template;
                InteractiveService.htmlTree.nodes = angular.copy(InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes);
                self.save();
            },
            addNewTemplate: function(){
                InteractiveService.htmlTree[self.newTemplate.title] = {nodes:[]};
                self.switchTemplate(self.newTemplate.title);
                self.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);
                self.save();
                self.newTemplate = null;
            },

            addPropertyToProperty: function(property){
                if(property.type === 'object' || property.type === 'array'){
                    if(!property.defaultValue || typeof property.defaultValue !== 'object'){
                        property.defaultValue = [];
                    }

                    property.defaultValue.push({
                        key: null,
                        type: null,
                        defaultValue: null,
                        value: null
                    });
                }
            }
        };

        if($localStorage.hasOwnProperty('OrbiterInteractiveProperties') && $localStorage.OrbiterInteractiveProperties && Object.keys($localStorage.OrbiterInteractiveProperties).length > 0){
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
        }else{
            $localStorage.OrbiterInteractiveProperties = angular.copy(InteractiveProperties);
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
        }

        for(var prop in InteractiveService.properties){
            if(InteractiveService.properties[prop].hasOwnProperty('defaultValue')){
                InteractiveService.properties[prop].value = InteractiveService.properties[prop].defaultValue;
            }else if(InteractiveService.properties[prop].hasOwnProperty('properties') && InteractiveService.properties[prop].orbiterType === 'element'){
                for(var p in InteractiveService.properties[prop].properties){
                    try{
                        var bind = InteractiveService.lookUpPath(InteractiveService.properties, InteractiveService.properties[prop].properties[p].bind);
                        if(bind){
                            InteractiveService.properties[prop].properties[p].value = bind.hasOwnProperty('defaultValue')? bind.defaultValue : bind.hasOwnProperty('value') ? bind.value : bind;
                        }
                    }catch(e){
                        //console.log(InteractiveService.properties[prop].properties[p], p)
                    }
                }
            }
        }


        if($localStorage.hasOwnProperty('OrbiterInteractiveMethods') && $localStorage.OrbiterInteractiveMethods && Object.keys($localStorage.OrbiterInteractiveMethods).length > 0){
            InteractiveService.methods = $localStorage.OrbiterInteractiveMethods;
        }else{
            $localStorage.OrbiterInteractiveMethods = angular.copy(InteractiveMethods);
            InteractiveService.methods = $localStorage.OrbiterInteractiveMethods;
        }

        InteractiveService.libraries = InteractiveLibraries;

        if($localStorage.hasOwnProperty('OrbiterInteractiveTree') && $localStorage.OrbiterInteractiveTree.hasOwnProperty('nodes') && $localStorage.OrbiterInteractiveTree.nodes.length > 0){
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
        }else{
            $localStorage.OrbiterInteractiveTree = {nodes:[]};
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
            self.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);
        }

        if(!InteractiveService.htmlTree.hasOwnProperty('main')){
            InteractiveService.htmlTree.main = {nodes:InteractiveService.htmlTree.nodes};
            InteractiveService.htmlTree.current = 'main';
        }

        if(!InteractiveService.htmlTree.current){
            InteractiveService.htmlTree.current = 'main';
        }

        self.activeProperties(InteractiveService.lookUpPath(InteractiveService.properties, InteractiveService.htmlTree.nodes[0].id));
        console.log(InteractiveService)



        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
