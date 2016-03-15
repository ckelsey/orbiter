(function () {
    'use strict';
    function propertySelectorDialogue(OrbiterService, InteractiveService){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/property-selector-dialogue.html',
            link:function(scope){
                scope.defaultPropertySelectorLayers = [[
                    {
                        label: 'Properties',
                        path: ['property']
                    },
                    {
                        label: 'Elements',
                        path: ['element']
                    }
                ]];

                scope.propertySelectorLayersPath = [];

                scope.propertySelectorLayers = angular.copy(scope.defaultPropertySelectorLayers);

                scope.setPropertySelectorLayers = function(path){
                    scope.propertySelectorLayersPath = [];
                    scope.propertySelectorLayers = angular.copy(scope.defaultPropertySelectorLayers);
                    var obj = InteractiveService.properties;
                    var workingObject = {};
                    var currentPath = path[0];

                    for(var pathIndex=0;pathIndex<path.length;pathIndex++){
                        if(pathIndex === 0){
                            obj = InteractiveService.properties;
                        }else{
                            obj = obj[path[pathIndex]];
                        }
                        var layer = [];
                        scope.propertySelectorLayersPath.push(path[pathIndex]);
                        for(var prop in obj){
                            if((obj.hasOwnProperty('orbiterType') && (obj.orbiterType === 'element' && prop !== 'properties')) || (pathIndex === 0 && obj[prop].orbiterType !== path[pathIndex])){
                                continue;
                            }else{
                                var thisPath = path.slice(0, (pathIndex + 1));
                                thisPath.push(prop);
                                var _this = {
                                    label: prop,
                                    path: thisPath
                                };

                                if(obj[prop].hasOwnProperty('orbiterType') && obj[prop].hasOwnProperty('value') || (obj[prop].hasOwnProperty('bind') && obj[prop].hasOwnProperty('value'))){
                                    _this.end = true;
                                }
                                layer.push(_this);
                            }
                        }

                        if(layer.length){
                            scope.propertySelectorLayers.push(layer);
                        }
                    }
                };

                scope.savePropertySelectorDialogue = function(){
                    scope.propertySelectorLayersPath.shift();
                    var targetObj = InteractiveService.properties;
                    for(var i=0;i<scope.propertySelectorLayersPath.length;i++){
                        targetObj = targetObj[scope.propertySelectorLayersPath[i]];
                    }
                    console.log(targetObj)
                    OrbiterService.propertySelectorDialogue.obj[OrbiterService.propertySelectorDialogue.key] = scope.propertySelectorLayersPath.join('.');
                    OrbiterService.propertySelectorDialogue = null;
                };
            }
        };
    }

    angular.module('app')
    .directive('propertySelectorDialogue', propertySelectorDialogue);
})();
