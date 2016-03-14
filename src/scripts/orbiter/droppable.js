(function () {
    'use strict';
    function orbiterDroppable(OrbiterService, InteractiveService){
        return {
            restrict: 'A',
            link:function(scope,element,attributes){
                function makeid(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for( var i=0; i < 14; i++ ){ text += possible.charAt(Math.floor(Math.random() * possible.length)); }
                    return text;
                }

                var id = attributes.id;
                if (!id) {
                    id = makeid();
                    element.attr("id", id);
                }

                element.bind("dragover", function(e) {
                    e.preventDefault();
                    element.addClass(attributes.orbiterDroppable? InteractiveService.canAccept(attributes.orbiterDroppable) : InteractiveService.canAcceptDragClass)
                });

                element.bind("dragleave", function(e) {
                    element.removeClass(InteractiveService.canAcceptDragClass)
                });

                element.bind("drop", function(e) {
                    e.preventDefault();
                    var data = OrbiterService.dragging;
                    element.removeClass(InteractiveService.canAcceptDragClass)
                    return false;
                });
            }
        };
    }

    angular.module('app')
    .directive('orbiterDroppable', orbiterDroppable);
})();
