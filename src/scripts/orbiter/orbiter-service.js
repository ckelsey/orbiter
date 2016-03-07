// Select node
//  - blur/opacity others

// Global settings
//  - color
//  - font size

// View settings
//  - all borders
//  - selected borders
//  - none

// Handle nested elements - <node><node></node></node>

(function () {
    'use strict';

    function OrbiterService(InteractiveService, OrbiterElementTypes, $localStorage){
        InteractiveService.developer = true;

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
                if(self.elementProperties){
                    self.elementProperties.active = false;
                }
                if(parent.id !== node.id){
                    node.active = true;
                    self.elementProperties = node;
                    parent.nodes.push(data);
                }
            },

            elementProperties: null,
            activeProperties: function(data){
                console.log(data);
                if(self.elementProperties){
                    self.elementProperties.active = false;
                }
                data.active = true;
                self.elementProperties = data;
            },

            save: function(){
                if(!$localStorage.OrbiterInteractive){
                    $localStorage.OrbiterInteractive = {};
                }
console.log($localStorage)
                $localStorage.OrbiterInteractive.htmlTree = InteractiveService.htmlTree;
            }
        };
        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
