// Data
//  - new
//      - simple var
//      - mfly data
//  - conditionals on nodes based on data

// More css attributes
//  - fix color picker
//  - bring back dropdowns



// Select node
//  - blur/opacity others

// Global settings- can be done with custom bindings
//  - color
//  - font size

// View settings
//  - all borders
//  - selected borders
//  - none

// Handle nested elements - <node><node></node></node>



// Events
//  - add to node
//  - on event, do something

// Interactives - need a cycle and find/mod function

// Drag to resize

// minimize transitions


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
                node.nodes = [];
                node.id = data.label +'_'+ new Date().getTime();

                if(parent.id !== node.id){
                    InteractiveService.properties[InteractiveService.propertyPrefix + node.id] = {};
                    for(var p in node.properties){
                        node.properties[p].bind = InteractiveService.propertyPrefix + node.id +'.'+ p;
                        InteractiveService.properties[InteractiveService.propertyPrefix + node.id][p] = {value:node.properties[p].value};
                    }
                    InteractiveService.elementProperties = node;
                    parent.nodes.push(node);
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

            newDataObject: null,

            currentEventObject: null,

            removeArrayElement: function(obj, index){
                return obj.splice(index, 1);
            },


            propertyDialogue: null,

            updatedValue: function(property){
                console.log(property)
            }
        };

        if($localStorage.hasOwnProperty('OrbiterInteractiveProperties') && $localStorage.OrbiterInteractiveProperties && Object.keys($localStorage.OrbiterInteractiveProperties).length > 0){
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
        }else{
            $localStorage.OrbiterInteractiveProperties = angular.copy(InteractiveProperties);
            InteractiveService.properties = $localStorage.OrbiterInteractiveProperties;
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


        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
