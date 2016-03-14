/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function propertyMapperDialogue(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var run = function() {
                    scope.propertyMapper = {};
                    var propertiesToUpdate = {};
                    var availableProperties = {};
                    scope.sortedPropertiesToUpdate = {};

                    var html = '';

                    var getPropertyHTML = function(key){
                        html += '<div class="property">';
                            html += '<label>' + key + '</label>';
                            html += '<div class="property-options-wrapper">';
                                html += '<input ng-model="sortedPropertiesToUpdate[\''+ key +'\'].new" type="text" ng-focus="'+ key +'PropertyFieldFocus=true">';
                                html += '<button ng-if="sortedPropertiesToUpdate[\''+ key +'\'].new !== \'none\'" ng-click="sortedPropertiesToUpdate[\''+ key +'\'].new = \'none\'" class="red" style="position: absolute; right: 0px; top: -3px;"><i class="fa fa-ban"></i></button>'
                                html += '<div class="property-options" ng-class="'+ key +'PropertyFieldFocus ? \'open\' : \'\'">';
                                    html += '<div class="property-option" ng-if="';
                                    html += 'propKey.indexOf(orb.InteractiveService.propertyPrefix) === -1 && (';
                                    html += 'sortedPropertiesToUpdate[\''+ key +'\'].new === \'\' ||';
                                    html += 'sortedPropertiesToUpdate[\''+ key +'\'].new === \'none\' ||';
                                    html += 'orb.lowerCase(prop.key).indexOf(sortedPropertiesToUpdate[\''+ key +'\'].new) > -1';
                                    html += ')" ng-repeat="(propKey, prop) in orb.InteractiveService.properties" ';
                                    html += 'ng-bind="prop.key"';
                                    html += 'ng-click="sortedPropertiesToUpdate[\''+ key +'\'].new = prop.key;'+ key +'PropertyFieldFocus=false"';
                                    html += '></div>';
                                html += '</div>';
                            html += '</div>';
                        html += '</div>';
                    };

                    html += '<div class="c-dialogue_inner">';
                    html += '<h2>';
                    html += '<span>Map properties</span>';
                    html += '<span>';
                    html += '<button class="circle" ng-click="orb.OrbiterService.mapProperties(orb.OrbiterService.propertyMapperDialogue.element, sortedPropertiesToUpdate);orb.OrbiterService.propertyMapperDialogue=null" style="margin-right: 7px;"><i class="fa fa-check"></i></button>';
                    html += '<button class="circle orange" ng-click="orb.OrbiterService.propertyMapperDialogue=null"><i class="fa fa-close"></i></button>';
                    html == '</span>';
                    html += '</h2>';
                    html += '<div>'




                    if(OrbiterService.propertyMapperDialogue.type === 'text'){
                        var boundObj = InteractiveService.properties[OrbiterService.propertyMapperDialogue.element.properties.text.bind];
                        var elementId = OrbiterService.propertyMapperDialogue.element;
                        var bindId = OrbiterService.propertyMapperDialogue.element.properties.text.bind;

                        scope.sortedPropertiesToUpdate = {
                            text:{
                                current: boundObj || {key:'none'},
                                new: boundObj ? boundObj.key : 'none'
                            }
                        };
                        getPropertyHTML('text');
                    }

                    html += '</div>';
                    html += '</div>';
                    element.html(html);
                    $compile(element.contents())(scope);
                };
                run();
                scope.$watch(function(){
                    return OrbiterService.propertyMapperDialogue.element.id;
                }, function(o,n){
                    if(o!==n){
                        run();
                    }
                });
            }
        };
    }

    angular.module('app')
    .directive('propertyMapperDialogue', propertyMapperDialogue);
})();
