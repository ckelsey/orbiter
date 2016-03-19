/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function textProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['font-size', 'font-weight', 'font-style', 'text-decoration', 'text-align', 'color'];
                var run = function() {
                    scope.textProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.textProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="textSettingsToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="textSettingsToggled ? textSettingsToggled=false : textSettingsToggled=true">Text settings</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-text-height"></i></label>' +
                                            '<input ng-model="textProperties[\'font-size\'].value" type="text" />' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-bold"></i></label>' +
                                            '<select ng-model="textProperties[\'font-weight\'].value">' +
                                                '<option value="lighter">Lighter</option>' +
                                                '<option value="light">Light</option>' +
                                                '<option value="normal">Normal</option>' +
                                                '<option value="bold">Bold</option>' +
                                                '<option value="bolder">Bolder</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-italic"></i></label>' +
                                            '<select ng-model="textProperties[\'font-style\'].value">' +
                                                '<option value="italic">Italic</option>' +
                                                '<option value="oblique">Oblique</option>' +
                                                '<option value="normal">Normal</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-underline"></i></label>' +
                                            '<select ng-model="textProperties[\'text-decoration\'].value">' +
                                                '<option value="underline">Underline</option>' +
                                                '<option value="line-through">Line through</option>' +
                                                '<option value="overline">Overline</option>' +
                                                '<option value="none">None</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-align-justify"></i></label>' +
                                            '<select ng-model="textProperties[\'text-align\'].value">' +
                                                '<option value="left">left</option>' +
                                                '<option value="center">center</option>' +
                                                '<option value="right">right</option>' +
                                                '<option value="justify">justify</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-eyedropper"></i></label>' +
                                            '<a-ckolor model="textProperties[\'color\'].value" type="\'hidden\'"></a-ckolor>' +
                                        '</div>'+
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
    .directive('textProperties', textProperties);
})();
