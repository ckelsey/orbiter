/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function spacingProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['padding-top', 'padding-bottom', 'padding-right', 'padding-left', 'margin-top', 'margin-bottom', 'margin-right', 'margin-left'];
                var run = function() {
                    scope.spacingProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        scope.spacingProperties[availableStyles[i]] = InteractiveService.lookUpPath(InteractiveService.properties, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                    }

                    var inputTitle = 'Units of measurement can be in px, em, %, etc...';
                    var inputAttrs = ' type="text" title="'+inputTitle+'"';

                    var html = ''+
                        '<div class="c-expandable" ng-class="spacingSettingsToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="spacingSettingsToggled ? spacingSettingsToggled=false : spacingSettingsToggled=true">Margin - Padding</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-spacing-table margin">'+
                                        '<div class="c-spacing-table-cell">'+
                                            '<input ng-model="spacingProperties[\'margin-left\'].value"'+ inputAttrs +'>'+
                                        '</div>'+
                                        '<div class="c-spacing-table-cell">'+
                                            '<span>Margins</span>'+
                                            '<div class="middle-top">'+
                                                '<input ng-model="spacingProperties[\'margin-top\'].value"'+ inputAttrs +'>'+
                                            '</div>'+
                                            '<div class="c-spacing-table padding">'+
                                                '<div class="c-spacing-table-cell">'+
                                                    '<input ng-model="spacingProperties[\'padding-left\'].value"'+ inputAttrs +'>'+
                                                '</div>'+
                                                '<div class="c-spacing-table-cell">'+
                                                    '<span>Padding</span>'+
                                                    '<div class="middle-top">'+
                                                        '<input ng-model="spacingProperties[\'padding-top\'].value"'+ inputAttrs +'>'+
                                                    '</div>'+
                                                    '<div class="middle-bottom">'+
                                                        '<input ng-model="spacingProperties[\'padding-bottom\'].value"'+ inputAttrs +'>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="c-spacing-table-cell">'+
                                                    '<input ng-model="spacingProperties[\'padding-right\'].value"'+ inputAttrs +'>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="middle-bottom">'+
                                                '<input ng-model="spacingProperties[\'margin-bottom\'].value"'+ inputAttrs +'>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="c-spacing-table-cell">'+
                                            '<input ng-model="spacingProperties[\'margin-right\'].value"'+ inputAttrs +'>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
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
    .directive('spacingProperties', spacingProperties);
})();
