/* TODO
    - make demo using mflycommamds


    APP:
        - Create middleman module, specifically for save() and switchTemplate()
        - default image url
        - video, iframe, audio
        - template, repeat binding doesn't update view
        - mock for data. Maybe if in developer mode, if data is null, display null text
        - Export standalone app
        - On property delete, find all bindings and update t default(with a warning that that is happening)
        - Walkthru
        - Undo/redo everything
        - Change default prop val from inherit to null. If null, skip adding to style attribute

    Libraries:
        - manual import

    Properties:
        - Style classes
        - Global CSS
        - bind group and individual properties

    Tasks:
        - always, success, error, fail, pipe, progress promises
        - rearrange tasks
        - Create custom reusable methods
        - $RESULT$ as an option in promises

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
        - Drag to resize node





*/


(function () {
    'use strict';

    function OrbiterService(InteractiveService, InteractiveProperties, InteractiveMethods, InteractiveLibraries, OrbiterElementsService, OrbiterPropertyService, OrbiterElementTypes, $localStorage, $timeout){
        var self = {
            dialogueModelType: null,
            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            /* Property Mapping */
            selectedProperty: null,
            saveSelectedProperty: function(data){
                $timeout(function(){
                    var type = data.path.split('.')[0];
                    if(type === 'libraries'){
                        var dataObj = InteractiveService.lookUpPath(InteractiveService, data.path);
                        if(dataObj.length){
                            data.obj.arguments = [];
                            for(var a=0;a<dataObj.length;a++){
                                data.obj.arguments.push({type:null, value:null});
                            }
                        }
                    }

                    data.obj[data.key] = data.path;
                    self.save();
                    self.selectedProperty = null;
                });
            },

            removeArrayElement: function(obj, index){
                return obj.splice(index, 1);
            },

            mapProperties: function(element, data){
                for(var prop in data){
                    if(data[prop].new && data[prop].new !== 'none'){
                        element.properties[prop].bind = data[prop].new;
                    }else if(data[prop].new === 'none'){
                        element.properties[prop].bind = element.id +'.'+ prop;
                    }
                }
            },
            /* End Property Mapping */



            save: function(){
                InteractiveService.htmlTree[InteractiveService.htmlTree.current] = {nodes:InteractiveService.htmlTree.nodes};

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
                $localStorage.OrbiterInteractiveElements = InteractiveService.elements;
                $localStorage.OrbiterInteractiveMethods = InteractiveService.methods;
            },

            projectDataDialogue: null,
            exportProject: function(){
                self.projectDataDialogue = {
                    type: 'export',
                    data: JSON.stringify({
                        OrbiterInteractiveTree: InteractiveService.htmlTree,
                        OrbiterInteractiveProperties: InteractiveService.properties,
                        OrbiterInteractiveElements: InteractiveService.elements,
                        OrbiterInteractiveMethods: InteractiveService.methods
                    })
                };
            },
            importProject: function(data){
                try{
                    var importData = JSON.parse(data.data);
                    $localStorage.OrbiterInteractiveProperties = importData.OrbiterInteractiveProperties;
                    InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;

                    for(var prop in InteractiveService.properties){
                        if(InteractiveService.properties[prop].hasOwnProperty('defaultValue')){
                            OrbiterPropertyService.buildProperty(InteractiveService.properties[prop]);
                        }
                    }

                    $localStorage.OrbiterInteractiveElements = importData.OrbiterInteractiveElements;
                    InteractiveService.elements = $localStorage.OrbiterInteractiveElements;

                    for(var prop in InteractiveService.elements){
                        for(var p in InteractiveService.elements[prop].properties){
                            var bind = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elements[prop].properties[p].bind);
                            if(bind){
                                InteractiveService.elements[prop].properties[p].value = bind.hasOwnProperty('defaultValue')? bind.defaultValue : bind.hasOwnProperty('value') ? bind.value : bind;
                            }
                        }
                    }

                    if(importData.hasOwnProperty('OrbiterInteractiveTree') && importData.OrbiterInteractiveTree.hasOwnProperty('nodes') && importData.OrbiterInteractiveTree.nodes.length > 0){
                        $localStorage.OrbiterInteractiveTree = importData.OrbiterInteractiveTree;
                        InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
                    }else{
                        $localStorage.OrbiterInteractiveTree = {nodes:[]};
                        InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
                        OrbiterElementsService.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);
                    }
                    OrbiterElementsService.activeProperties(InteractiveService.lookUpPath(InteractiveService.elements, InteractiveService.htmlTree.nodes[0].id));

                    if(!InteractiveService.htmlTree.hasOwnProperty('main')){
                        InteractiveService.htmlTree.main = {nodes:InteractiveService.htmlTree.nodes};
                        InteractiveService.htmlTree.current = 'main';
                    }

                    if(!InteractiveService.htmlTree.current){
                        InteractiveService.htmlTree.current = 'main';
                    }

                    if(!InteractiveService.developer){
                        InteractiveService.htmlTree.current = 'main';
                    }


                    self.projectDataDialogue = null;
                }catch(e){
                    console.log(e)
                }
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
                        InteractiveService.elements[InteractiveService.elementProperties.id].events = InteractiveService.elementProperties.events;
                        self.save();
                    }
                    self.currentEventObject = null;
                    self.dialogueModelType = null;
                }
            },

            switchTemplate: function(template){
                InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes = angular.copy(InteractiveService.htmlTree.nodes);
                InteractiveService.htmlTree.current = template;
                InteractiveService.htmlTree.nodes = angular.copy(InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes);
                self.save();
            },
        };

        if($localStorage.hasOwnProperty('OrbiterInteractiveProperties') && $localStorage.OrbiterInteractiveProperties && Object.keys($localStorage.OrbiterInteractiveProperties).length > 0){
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
        }else{
            $localStorage.OrbiterInteractiveProperties = angular.copy(InteractiveProperties);
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
        }

        for(var prop in InteractiveService.properties){
            if(InteractiveService.properties[prop].hasOwnProperty('defaultValue')){
                OrbiterPropertyService.buildProperty(InteractiveService.properties[prop]);
                //InteractiveService.properties[prop].value = InteractiveService.properties[prop].defaultValue;
            }
        }

        if($localStorage.hasOwnProperty('OrbiterInteractiveElements') && $localStorage.OrbiterInteractiveElements && Object.keys($localStorage.OrbiterInteractiveElements).length > 0){
            InteractiveService.elements = $localStorage.OrbiterInteractiveElements;
        }else{
            $localStorage.OrbiterInteractiveElements = {};
            InteractiveService.elements = $localStorage.OrbiterInteractiveElements;
        }

        for(var prop in InteractiveService.elements){
            for(var p in InteractiveService.elements[prop].properties){
                var bind = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elements[prop].properties[p].bind);
                if(bind){
                    InteractiveService.elements[prop].properties[p].value = bind.hasOwnProperty('defaultValue')? bind.defaultValue : bind.hasOwnProperty('value') ? bind.value : bind;
                }
            }
        }

        if($localStorage.hasOwnProperty('OrbiterInteractiveTree') && $localStorage.OrbiterInteractiveTree.hasOwnProperty('nodes') && $localStorage.OrbiterInteractiveTree.nodes.length > 0){
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
        }else{
            $localStorage.OrbiterInteractiveTree = {nodes:[]};
            InteractiveService.htmlTree = $localStorage.OrbiterInteractiveTree;
            OrbiterElementsService.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);
        }
        OrbiterElementsService.activeProperties(InteractiveService.lookUpPath(InteractiveService.elements, InteractiveService.htmlTree.nodes[0].id));

        if(!InteractiveService.htmlTree.hasOwnProperty('main')){
            InteractiveService.htmlTree.main = {nodes:InteractiveService.htmlTree.nodes};
            InteractiveService.htmlTree.current = 'main';
        }

        if(!InteractiveService.htmlTree.current || !InteractiveService.developer){
            self.switchTemplate('main');
        }

        console.log(InteractiveService)



        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
