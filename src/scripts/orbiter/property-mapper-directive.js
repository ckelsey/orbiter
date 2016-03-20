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

                    var getPropertyHTML = function(key, bindCategory){
                        html += '<div class="property">';
                            html += '<label>' + key + '</label>';
                            // html += '<button ng-click="orb.OrbiterService.propertySelectorDialogue={obj:sortedPropertiesToUpdate[\''+ key +'\'],key:\'new\', type:\''+ bindCategory +'\'}" ng-bind="sortedPropertiesToUpdate[\''+ key +'\'].new || \'set\'"></button>';
                            html += '<button ng-click="orb.OrbiterService.selectedProperty={obj:sortedPropertiesToUpdate[\''+ key +'\'], key:\'new\', type:\''+ bindCategory +'\', path:sortedPropertiesToUpdate[\''+ key +'\'].new || null}; orb.OrbiterService.dialogueModelType=\'properties\'" ng-bind="sortedPropertiesToUpdate[\''+ key +'\'].new || \'set\'"></button>';
                        html += '</div>';
                    };

                    html += '<div class="c-dialogue_inner">';
                    html += '<h3>';
                    html += '<span>Map properties</span>';
                    html += '<span>';
                    html += '<button class="circle" ng-click="orb.OrbiterService.mapProperties(orb.OrbiterService.propertyMapperDialogue.element, sortedPropertiesToUpdate);orb.OrbiterService.propertyMapperDialogue=null" style="margin-right: 7px;"><i class="fa fa-check"></i></button>';
                    html += '<button class="circle orange" ng-click="orb.OrbiterService.propertyMapperDialogue=null"><i class="fa fa-close"></i></button>';
                    html == '</span>';
                    html += '</h3>';
                    html += '<div>'




                    scope.sortedPropertiesToUpdate = {};
                    scope.sortedPropertiesToUpdate[OrbiterService.propertyMapperDialogue.type] = {
                        current: OrbiterService.propertyMapperDialogue.element.properties[OrbiterService.propertyMapperDialogue.type].bind,
                        new: OrbiterService.propertyMapperDialogue.element.properties[OrbiterService.propertyMapperDialogue.type].bind
                    };
                    var bindCategory = null;
                    switch(OrbiterService.propertyMapperDialogue.type){
                        case 'template': bindCategory = 'htmlTree'; break;
                        default: bindCategory = 'properties';
                    }
                    getPropertyHTML(OrbiterService.propertyMapperDialogue.type, bindCategory);

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
