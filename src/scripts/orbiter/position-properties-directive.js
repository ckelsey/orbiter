/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function positionProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['position', 'top', 'bottom', 'left', 'right', 'transform'];
                var run = function() {
                    scope.positionProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.positionProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="positionSettingsToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="positionSettingsToggled ? positionSettingsToggled=false : positionSettingsToggled=true">Position</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-thumb-tack"></i></label>' +
                                            '<select ng-model="positionProperties[\'position\'].value">' +
                                                '<option value="static">static</option>' +
                                                '<option value="relative">relative</option>' +
                                                '<option value="absolute">absolute</option>' +
                                                '<option value="fixed">fixed</option>' +
                                                '<option value=""></option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrow-up"></i></label>' +
                                            '<input ng-model="positionProperties[\'top\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrow-down"></i></label>' +
                                            '<input ng-model="positionProperties[\'bottom\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrow-left"></i></label>' +
                                            '<input ng-model="positionProperties[\'left\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrow-right"></i></label>' +
                                            '<input ng-model="positionProperties[\'right\'].value" type="text" />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Transform</label>' +
                                            '<input ng-model="positionProperties[\'transform\'].value" type="text">' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    element.html(html);
                    $compile(element.contents())(scope);
                };
                run();
                scope.$watch(function(){
                    return InteractiveService.elementProperties.id;
                }, function(o,n){
                    if(o!==n){
                        run();
                    }
                });
            }
        };
    }

    angular.module('app')
    .directive('positionProperties', positionProperties);
})();
