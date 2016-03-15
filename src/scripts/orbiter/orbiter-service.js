/* TODO

-   Change map property target/values to popups



    APP:
        - CSS
            - clean up transitions, make specific
            - convert expandable to collapsable classes

    Import libraries:
        - mflyCommands

    Properties:
        - rename
        - delete

        - Style classes
        - Global CSS

    Elements:
        - delete
        - move, maybe a copy/cut+paste

    CSS:
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
        - handle nested elements - <node><node></node></node>
        - Drag to resize node

    Events:
        - validate that all options are set(type, target, etc...)
*/


(function () {
    'use strict';

    function OrbiterService(InteractiveService, InteractiveProperties, InteractiveMethods, OrbiterElementTypes, $localStorage, $timeout){
        var self = {
            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            elementClipboard: null,
            elementTrashcan: {},

            deleteElement: function(el){
                var elData = self.findInHtmlTree(el.id);
                self.elementTrashcan = {
                    properties: angular.copy(InteractiveService.properties[el.id]),
                    elementData: self.findInHtmlTree(el.id)
                };
                self.findInHtmlTree(el.id, 'delete');
                delete InteractiveService.properties[el.id];
            },

            copyElement: function(el){
                var elData = self.findInHtmlTree(el.id);
                self.elementClipboard = {properties: angular.copy(InteractiveService.properties[el.id]), element: elData.element};
            },

            pasteElement: function(el){
                var elData = self.findInHtmlTree(el.id);
                if(self.elementClipboard && elData.element){
                    var toPaste = self.elementClipboard.properties;
                    toPaste.nodes = self.elementClipboard.element.nodes;
                    //Cycle thru nodes and apply new id's
                    self.addToInteractive(elData.element, toPaste)
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
                            if(bind[0] === oldID){
                                bind[0] = node.id;
                                node.properties[p].bind = bind.join('.');
                            }
                        }
                    }
                }

                return node;
            },

            addToInteractive: function(parent, data){
                var node = self.giveUniqueId(data);
                node.created = new Date().getTime();
                node.orbiterType = 'element';

                for(var p in node.properties){
                    node.properties[p].bind = node.properties[p].bind ? node.properties[p].bind : node.id +'.properties.'+ p;
                }

                if(parent.id !== node.id){
                    if(!node.nodes){
                        node.nodes = [];
                    }else{

                    }
                    parent.nodes.push({
                        id: node.id,
                        nodes: node.nodes || []
                    });

                    delete node.nodes;
                    InteractiveService.properties[node.id] = node;
                }

                console.log(InteractiveService.properties)
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
                        element.properties[prop].bind = InteractiveService.propertyPrefix + element.id +'.'+ prop;
                    }
                }
            },

            updateProperties: function(data){

            },

            stagedNewProperty: null,
            stagedNewPropertyKeyConflict: false,
            insertNewProperty: function(data){
                if(!data.key){
                    self.stagedNewPropertyKeyConflict = "Property name is required";
                }else if(InteractiveService.properties.hasOwnProperty(data.key)){
                    self.stagedNewPropertyKeyConflict = "There is already a property with this name";
                }else{
                    data.value = data.defaultValue;
                    data.orbiterType = 'property';
                    InteractiveService.properties[data.key] = data;
                    self.stagedNewProperty = null;
                }
            },
            propertySelectorDialogue: null
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

        if($localStorage.hasOwnProperty('OrbiterInteractiveTree') && $localStorage.OrbiterInteractiveTree.hasOwnProperty('nodes') && $localStorage.OrbiterInteractiveTree.nodes.length > 0){
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
        }else{
            $localStorage.OrbiterInteractiveTree = {nodes:[]};
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
            self.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);

        }

        console.log(InteractiveService.htmlTree, InteractiveService.properties);


        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
