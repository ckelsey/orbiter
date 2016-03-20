(function () {
    'use strict';

    function OrbiterTemplatesService($localStorage, InteractiveService, OrbiterElementsService, OrbiterService, OrbiterElementTypes){
        var self = {
            newTemplate: null,
            switchTemplate: function(template){
                InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes = angular.copy(InteractiveService.htmlTree.nodes);
                InteractiveService.htmlTree.current = template;
                InteractiveService.htmlTree.nodes = angular.copy(InteractiveService.htmlTree[InteractiveService.htmlTree.current].nodes);
                OrbiterService.save();
            },
            addNewTemplate: function(){
                InteractiveService.htmlTree[self.newTemplate.title] = {nodes:[]};
                self.switchTemplate(self.newTemplate.title);
                OrbiterElementsService.addToInteractive(InteractiveService.htmlTree, OrbiterElementTypes.block);
                OrbiterService.save();
                self.newTemplate = null;
            },
            totalNodes: function(key){
                var nodeCount = 0;
                function cycle(obj){
                    nodeCount = nodeCount + obj.nodes.length
                    for (var i = 0; i < obj.nodes.length; i++) {
                        cycle(obj.nodes[i]);
                    }
                }
                cycle(InteractiveService.htmlTree[key]);
                return nodeCount;
            }
        };

        return self;
    }

    angular.module('app').service('OrbiterTemplatesService', OrbiterTemplatesService);
})();
