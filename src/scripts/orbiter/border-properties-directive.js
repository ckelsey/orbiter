(function () {
    'use strict';
    function borderProperties(OrbiterService, OrbiterElementTypes, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['border-top-width', 'border-top-style', 'border-top-color', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color', 'border-left-width', 'border-left-style', 'border-left-color', 'border-right-width', 'border-right-style', 'border-right-color'];
                var run = function() {
                    scope.borderProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.borderProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="borderPropertiesToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="borderPropertiesToggled ? borderPropertiesToggled=false : borderPropertiesToggled=true">Borders</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-border-table">'+
                                        '<div class="c-border-table-cell">'+
                                            '<div class="left-side">' +
                                                '<input ng-model="borderProperties[\'border-left-width\'].value">'+
                                                '<a-ckolor model="borderProperties[\'border-left-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                                '<select ng-model="borderProperties[\'border-left-style\'].value">';
                                                    for(var o=0;o<OrbiterElementTypes.block.properties["border-right-style"].options.length;o++){
                                                        html += '<option value="'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'">'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'</option>';
                                                    }
                                                html += '</select>' +
                                            '</div>' +
                                        '</div>'+
                                        '<div class="c-border-table-cell">'+
                                            '<div class="middle-top">'+
                                                '<input ng-model="borderProperties[\'border-top-width\'].value">'+
                                                '<a-ckolor model="borderProperties[\'border-top-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                                '<select ng-model="borderProperties[\'border-top-style\'].value">';
                                                    for(var o=0;o<OrbiterElementTypes.block.properties["border-right-style"].options.length;o++){
                                                        html += '<option value="'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'">'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'</option>';
                                                    }
                                                html += '</select>' +
                                            '</div>'+
                                            '<div class="middle-middle"></div>'+
                                            '<div class="middle-bottom">'+
                                                '<input ng-model="borderProperties[\'border-bottom-width\'].value">'+
                                                '<a-ckolor model="borderProperties[\'border-bottom-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                                '<select ng-model="borderProperties[\'border-bottom-style\'].value">';
                                                    for(var o=0;o<OrbiterElementTypes.block.properties["border-right-style"].options.length;o++){
                                                        html += '<option value="'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'">'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'</option>';
                                                    }
                                                html += '</select>' +
                                            '</div>'+
                                        '</div>'+
                                        '<div class="c-border-table-cell">'+
                                            '<div class="right-side">' +
                                                '<input ng-model="borderProperties[\'border-right-width\'].value">'+
                                                '<a-ckolor model="borderProperties[\'border-right-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                                '<select ng-model="borderProperties[\'border-right-style\'].value">';
                                                    for(var o=0;o<OrbiterElementTypes.block.properties["border-right-style"].options.length;o++){
                                                        html += '<option value="'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'">'+OrbiterElementTypes.block.properties["border-right-style"].options[o]+'</option>';
                                                    }
                                                html += '</select>' +
                                            '</div>' +
                                        '</div>'+
                                    '</div>'+
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
    .directive('borderProperties', borderProperties);
})();
