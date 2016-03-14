/* TODO

-   Change event target/values to popups:
        - dropdown for element or property
        - list of the above, click to save path


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
        - workflow:
            Tasks:
                [task type(set, if, endif, for, etc)] [property] [action(=, ===, etc)] [propert, value]
*/


(function () {
    'use strict';

    function OrbiterService(InteractiveService, InteractiveProperties, InteractiveMethods, OrbiterElementTypes, $localStorage){
        var self = {
            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            addToInteractive: function(parent, data){
                var node = data;
                node.id = data.label;
                node.orbiterType = 'element';
                var tempNumber = 1;

                while(InteractiveService.properties.hasOwnProperty(node.id +' '+ tempNumber)){
                    tempNumber++;
                }

                node.id = node.id +' '+ tempNumber;
                for(var p in node.properties){
                    node.properties[p].bind = node.id +'.properties.'+ p;
                }

                if(parent.id !== node.id){
                    parent.nodes.push({
                        id: node.id,
                        nodes: []
                    });
                    InteractiveService.properties[node.id] = node;
                    // InteractiveService.properties[node.id] = {};
                    // for(var p in node.properties){
                    //     node.properties[p].bind = InteractiveService.propertyPrefix + node.id +'.'+ p;
                    //     InteractiveService.properties[InteractiveService.propertyPrefix + node.id][p] = {value:node.properties[p].value};
                    // }
                    // InteractiveService.elementProperties = node;
                    // parent.nodes.push(node);
                }
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
                }else if(InteractiveService.properties.hasOwnProperty(data.id)){
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
                    updateElement(InteractiveService.htmlTree)
                }
            },

            elementProperties: null,
            activeProperties: function(data){
                if(InteractiveService.elementProperties){
                    InteractiveService.elementProperties.active = false;
                }
                data.active = true;
                InteractiveService.elementProperties = data;
                console.log(InteractiveService.elementProperties)
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
