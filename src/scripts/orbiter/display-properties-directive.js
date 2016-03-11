/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function diplayProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['display', 'background-color', 'box-shadow', 'border-radius'];
                var run = function() {
                    scope.diplayProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService.properties, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.diplayProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="diplayPropertiesToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler" ng-click="diplayPropertiesToggled ? diplayPropertiesToggled=false : diplayPropertiesToggled=true">Display</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-eye"></i></label>' +
                                            '<select ng-model="diplayProperties.display.value">' +
                                                '<option value="none">none</option>' +
                                                '<option value="block">block</option>' +
                                                '<option value="inline">inline</option>' +
                                                '<option value="inline-block">inline-block</option>' +
                                                '<option value="flex">flex</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-eyedropper"></i></label>' +
                                            '<a-ckolor model="diplayProperties[\'background-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Radius</label>' +
                                            '<input ng-model="diplayProperties[\'border-radius\'].value" type="text">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Shadow</label>' +
                                            '<input ng-model="diplayProperties[\'box-shadow\'].value" type="text">' +
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
    .directive('diplayProperties', diplayProperties);
})();
