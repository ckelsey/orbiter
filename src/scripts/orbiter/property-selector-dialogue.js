(function () {
    'use strict';
    function propertySelectorDialogue(OrbiterService, InteractiveService){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/property-selector-dialogue.html',
            link:function(scope){
                if(OrbiterService.propertySelectorDialogue.type === 'properties'){
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
                }else if(OrbiterService.propertySelectorDialogue.type === 'libraries'){
                    scope.defaultPropertySelectorLayers = [[]];
                    for(var m in InteractiveService.libraries){
                        scope.defaultPropertySelectorLayers[0].push({
                            label: m,
                            path: [m]
                        })
                    }
                }else if(OrbiterService.propertySelectorDialogue.type === 'htmlTree'){
                    scope.defaultPropertySelectorLayers = [[]];
                    for(var m in InteractiveService.htmlTree){
                        if(m !== 'current' && m !== 'nodes')
                        scope.defaultPropertySelectorLayers[0].push({
                            label: m,
                            path: [m]
                        })
                    }
                }else{
                    scope.defaultPropertySelectorLayers = [];
                }

                scope.propertySelectorLayersPath = [];
                scope.propertySelectorLayers = angular.copy(scope.defaultPropertySelectorLayers);

                scope.propertySelectorLayersPathPush = function(label, index){
                    scope.propertySelectorLayersPath.splice(index, 0, label);
                };

                scope.setPropertySelectorLayers = function(path){
                    scope.propertySelectorLayersPath = [];
                    scope.propertySelectorLayers = angular.copy(scope.defaultPropertySelectorLayers);
                    var obj = InteractiveService[OrbiterService.propertySelectorDialogue.type];
                    var workingObject = {};
                    var currentPath = path[0];
                    var noKeys = ['key', 'type', 'errors', 'defaultValue', 'orbiterType'];

                    for(var pathIndex=0;pathIndex<path.length;pathIndex++){
                        if(pathIndex === 0 && OrbiterService.propertySelectorDialogue.type === 'properties'){
                            obj = InteractiveService[OrbiterService.propertySelectorDialogue.type];
                        }else{
                            obj = obj[path[pathIndex]];
                        }

                        var layer = [];
                        scope.propertySelectorLayersPath.push(path[pathIndex]);
                        for(var prop in obj){
                            if(OrbiterService.propertySelectorDialogue.type === 'properties'){
                                if((obj.hasOwnProperty('orbiterType') && (obj.orbiterType === 'element' && prop !== 'properties')) || (pathIndex === 0 && obj[prop].orbiterType !== path[pathIndex])){
                                    continue;
                                }else if(obj.hasOwnProperty('orbiterType') && obj.hasOwnProperty('defaultValue') && (typeof obj.defaultValue === 'string' || typeof obj.defaultValue === 'number')){
                                    continue;
                                }else if(obj.hasOwnProperty('orbiterType') && obj.hasOwnProperty('defaultValue') && noKeys.indexOf(prop) > -1){
                                    continue;
                                }else{
                                    var thisPath = path.slice(0, (pathIndex + 1));
                                    thisPath.push(prop);
                                    var label = prop;

                                    var _this = {
                                        label: label,
                                        path: thisPath
                                    };

                                    // if(obj[prop].hasOwnProperty('orbiterType') && obj[prop].hasOwnProperty('value') || (obj[prop].hasOwnProperty('bind') && obj[prop].hasOwnProperty('value'))){
                                    //     _this.end = true;
                                    // }
                                    // if(obj[prop].hasOwnProperty('orbiterType') && obj[prop].hasOwnProperty('value')){
                                    //     _this.end = true;
                                    // }

                                    if(obj[prop].hasOwnProperty('bind') && obj[prop].hasOwnProperty('value') && Object.keys(obj[prop]).length === 2){
                                        _this.end = true;
                                    }

                                    if(obj[prop].hasOwnProperty('bind') && obj[prop].hasOwnProperty('value') && obj[prop].hasOwnProperty('options') && Object.keys(obj[prop]).length === 3){
                                        _this.end = true;
                                    }

                                    layer.push(_this);
                                }
                            }else if(OrbiterService.propertySelectorDialogue.type === 'libraries'){
                                var thisPath = path.slice(0, (pathIndex + 1));
                                thisPath.push(prop);

                                var _this = {
                                    label: prop,
                                    path: thisPath
                                };

                                if(typeof obj.prop === 'function'){
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

                scope.setVal = function(obj, path, val){
                    var path = path.split('.');
                    if(path.length === 1){
                        obj[path[0]] = val;
                        return obj;
                    }
                    path.shift();
                    return scope.setVal(obj, path, val);
                };

                scope.savePropertySelectorDialogue = function(){
                    if(OrbiterService.propertySelectorDialogue.type === 'properties'){
                        scope.propertySelectorLayersPath.shift();
                    }

                    scope.propertySelectorLayersPath.unshift(OrbiterService.propertySelectorDialogue.type);

                    var targetObj = InteractiveService;
                    for(var i=0;i<scope.propertySelectorLayersPath.length;i++){
                        targetObj = targetObj[scope.propertySelectorLayersPath[i]];
                    }

                    if(typeof targetObj === 'function' && targetObj.length){
                        OrbiterService.propertySelectorDialogue.obj.arguments = [];
                        OrbiterService.propertySelectorDialogue.obj.arguments.length = targetObj.length;
                        for(var a=0;a<OrbiterService.propertySelectorDialogue.obj.arguments.length;a++){
                            OrbiterService.propertySelectorDialogue.obj.arguments[a] = {
                                type:null,
                                value:null
                            };
                        }
                    }

                    scope.setVal(OrbiterService.propertySelectorDialogue.obj, OrbiterService.propertySelectorDialogue.key, scope.propertySelectorLayersPath.join('.'))
                    OrbiterService.propertySelectorDialogue = null;
                };
            }
        };
    }

    angular.module('app')
    .directive('propertySelectorDialogue', propertySelectorDialogue);
})();
