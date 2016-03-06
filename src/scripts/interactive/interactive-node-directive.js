(function () {
    'use strict';
    function interactiveNode(InteractiveService, OrbiterService){
        return {
            restrict: 'A',
            scope: {
                'data': '=interactiveNode',
                'parent': '=interactiveNodeParent',
                'parentPath': '=interactiveNodeParentPath'
            },
            templateUrl: '../../html/interactive/interactive-node.html',
            link:function(scope,element,attributes){
                function makeid(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for( var i=0; i < 14; i++ ){ text += possible.charAt(Math.floor(Math.random() * possible.length)); }
                    element.attr("id", id);
                    return text;
                }
                var id = attributes.id || makeid();

                element.bind("dragover", function(e) {
                    e.preventDefault();
                    element.addClass(attributes.orbiterAcceptDrop? InteractiveService.canAccept(attributes.orbiterAcceptDrop) : InteractiveService.canAcceptDragClass)
                });

                element.bind("dragleave", function(e) {
                    element.removeClass(InteractiveService.canAcceptDragClass)
                });

                element.bind("drop", function(e) {
                    e.preventDefault();
                    var data = OrbiterService.dragging;
                    element.removeClass(InteractiveService.canAcceptDragClass);
                    OrbiterService.addToInteractive(scope.data, data)
                    return false;
                });
            }
        };
    }

    angular.module('app')
    .directive('interactiveNode', interactiveNode);
})();
