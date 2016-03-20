/* TODO
    - copy/paste is broken
    - Available libraries
    - img, video, iframe, audio
    - import export
    - make demo using mflycommamds


    APP:
        - move templates and events out of OrbiterService

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

    - On property delete, find all bindings and update t default(with a warning that that is happening)
    - Walkthru
    - Undo/redo everything



*/


(function () {
    'use strict';

    function OrbiterService(InteractiveService, InteractiveProperties, InteractiveMethods, InteractiveLibraries, OrbiterElementTypes, $localStorage, $timeout){
        var self = {
            dialogueModelType: null,
            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            selectedProperty: null,
            saveSelectedProperty: function(data){
                $timeout(function(){data.obj[data.key] = data.path;});
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
                $localStorage.OrbiterInteractiveElements = InteractiveService.elements;
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





            mapProperties: function(element, data){
                for(var prop in data){
                    if(data[prop].new && data[prop].new !== 'none'){
                        element.properties[prop].bind = data[prop].new;
                    }else if(data[prop].new === 'none'){
                        element.properties[prop].bind = element.id +'.'+ prop;
                    }
                }
            },


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
            }
        };




        if($localStorage.hasOwnProperty('OrbiterInteractiveMethods') && $localStorage.OrbiterInteractiveMethods && Object.keys($localStorage.OrbiterInteractiveMethods).length > 0){
            InteractiveService.methods = $localStorage.OrbiterInteractiveMethods;
        }else{
            $localStorage.OrbiterInteractiveMethods = angular.copy(InteractiveMethods);
            InteractiveService.methods = $localStorage.OrbiterInteractiveMethods;
        }

        InteractiveService.libraries = InteractiveLibraries;



        if(!InteractiveService.htmlTree.hasOwnProperty('main')){
            InteractiveService.htmlTree.main = {nodes:InteractiveService.htmlTree.nodes};
            InteractiveService.htmlTree.current = 'main';
        }

        if(!InteractiveService.htmlTree.current){
            InteractiveService.htmlTree.current = 'main';
        }

        console.log(InteractiveService)



        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
