(function () {
    'use strict';
    function elementPropertyInput(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            scope:{
                element: '=elementModel',
                propertyKey: '=propertyKey',
                inputType: '=inputType'
            },
            link:function(scope,element,attributes){
                function run(){
                    var html = '';

                    if(scope.element && scope.propertyKey && scope.element.properties.hasOwnProperty(scope.propertyKey)){
                        scope.property = scope.element.properties[scope.propertyKey];

                        if(scope.property){
                            scope.bindingObj = InteractiveService.lookUpPath(InteractiveService.properties, scope.property.bind);
                            switch (scope.inputType) {
                                case 'select':
                                    html += '<select ng-model="bindingObj.value"><option ng-repeat="option in property.options track by $index" value="{{option}}" ng-bind="option"></option></select>';
                                    break;
                                case 'textarea':
                                    html += '<textarea ng-model="bindingObj.value" ng-trim="false"></textarea>';
                                    break;
                                case 'text':
                                    html += '<input ng-model="bindingObj.value" type="text"></textarea>';
                                    break;
                                case 'color':
                                    html += '<a-ckolor model="bindingObj.value" type="\'hidden\'"></a-ckolor>';
                                    break;
                                default:

                            }
                        }
                    }

                    element.html(html);
                    $compile(element.contents())(scope);
                }

                run();

                scope.$watch(function(){
                    return InteractiveService.elementProperties.id;
                }, function(o,n){
                    if(o !== n){
                        run();
                    }
                });
            }
        };
    }

    angular.module('app')
    .directive('elementPropertyInput', elementPropertyInput);
})();
