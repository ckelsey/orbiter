(function () {
    'use strict';
    function orbiterDraggable(OrbiterService, InteractiveService){
        return {
            restrict: 'A',
            scope:{
                orbiterDragData: '=orbiterDragData'
            },
            link:function(scope,element,attributes){
                function makeid(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for( var i=0; i < 14; i++ ){ text += possible.charAt(Math.floor(Math.random() * possible.length)); }
                    return text;
                }

                element.attr("draggable", "true");

                var id = attributes.id;
                if (!id) {
                    id = makeid();
                    element.attr("id", id);
                }

                element.bind("dragstart", function(e) {
                    OrbiterService.drag(scope.orbiterDragData);
                    //return false;
                });

                element.bind("dragend", function(e) {
                    OrbiterService.drag(null);
                    // e.preventDefault();
                    // return false;
                });
            }
        };
    }

    angular.module('app')
    .directive('orbiterDraggable', orbiterDraggable);
})();
