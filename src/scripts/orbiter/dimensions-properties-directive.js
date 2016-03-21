/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function dimensionsProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'];
                var run = function() {
                    scope.dimensionsProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.dimensionsProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="dimensionsSettingsToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="dimensionsSettingsToggled ? dimensionsSettingsToggled=false : dimensionsSettingsToggled=true">Dimensions</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrows-h"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'width\'].value" type="text" />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label style="white-space:nowrap;">min <i class="fa fa-arrows-h"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'min-width\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label style="white-space:nowrap;">max <i class="fa fa-arrows-h"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'max-width\'].value" type="text" />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrows-v"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'height\'].value" type="text" />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label style="white-space:nowrap;">min <i class="fa fa-arrows-v"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'min-height\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label style="white-space:nowrap;">max <i class="fa fa-arrows-v"></i></label>' +
                                            '<input ng-model="dimensionsProperties[\'max-height\'].value" type="text" />' +
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
    .directive('dimensionsProperties', dimensionsProperties);
})();
