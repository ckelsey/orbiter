(function () {
    'use strict';

    function OrbiterCtlr($localStorage, $window, OrbiterService, OrbiterElementTypes, InteractiveService, $scope){
        var self = this;
        this.$localStorage = $localStorage;
        if(!$localStorage.Orbiter){
            $localStorage.Orbiter = {};
        }
        this.OrbiterService = OrbiterService;
        this.OrbiterElementTypes = OrbiterElementTypes;
        this.InteractiveService = InteractiveService;
        InteractiveService.developer = true;

        this.trackingMouseMove = false;
        this.mouseMoveMethod = null;
        this.sizingElement = null;

        this.endTrackingMouseMove = function(){
            if(self.trackingMouseMove){
                self.trackingMouseMove = false;
                self.mouseMoveMethod = null;
            }else{
                return false;
            }
        };

        this.trackMouseMove = function(e){
            if(self.trackingMouseMove){
                self.mouseMoveMethod(e)
            }else{
                return false;
            }
        };

        this.canvasElements = function(e){
            var element = self.sizingElement[0];
            for(var i=1;i<self.sizingElement.length;i++){
                element = element[self.sizingElement[i]];
            }
            var width = e.pageX - element.getBoundingClientRect().left;
            if(width < 0){
                width = 0;
            }

            self.$localStorage.Orbiter.elementsWidth = ((($window.innerWidth - width) / $window.innerWidth) * 100) + '%';
            self.$localStorage.Orbiter.canvasWidth = ((width / $window.innerWidth) * 100) + '%';
        };


        this.debug = function(msg){
            console.log(msg)
            return msg;
        };

        this.lowerCase = function(str){
            return str.toLowerCase();
        };

        this.formatDate = function(timestamp){
            if(!timestamp){
                timestamp = new Date().getTime();
            }

            var date = new Date(+timestamp);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours > 11 ? 'PM' : 'AM';
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();

            return month +'-'+ day +'-'+ year +' '+ hours +':'+ minutes +' '+ ampm;
        };

        this.typeOf = function(thing){
            if(thing instanceof Object){
                return 'object';
            }else if(thing instanceof Array){
                return 'array';
            }else{
                return 'string';
            }
        };

        this.dialogueOpen = false;

        $scope.$watch(function(){
            return self.OrbiterService.newDataObject;
        }, function(o,n){
            if(o !== n){
                if(self.OrbiterService.newDataObject){
                    self.dialogueOpen = true;
                }else{
                    self.dialogueOpen = false;
                }
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.propertyDialogue;
        }, function(o,n){
            if(o !== n){
                if(self.OrbiterService.propertyDialogue){
                    self.dialogueOpen = true;
                }else{
                    self.dialogueOpen = false;
                }
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.currentEventObject;
        }, function(o,n){
            if(o !== n){
                if(self.OrbiterService.currentEventObject){
                    self.dialogueOpen = true;
                }else{
                    self.dialogueOpen = false;
                }
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.propertyMapperDialogue;
        }, function(o,n){
            if(o !== n){
                if(self.OrbiterService.propertyMapperDialogue){
                    self.dialogueOpen = true;
                }else{
                    self.dialogueOpen = false;
                }
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.propertySelectorDialogue;
        }, function(o,n){
            if(o !== n){
                if(self.OrbiterService.propertySelectorDialogue){
                    self.dialogueOpen = true;
                }else{
                    self.dialogueOpen = false;
                }
            }
        });
    }

    angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/_', {
            title: 'Orbiter',
            templateUrl: '../../html/orbiter/main.html',
            controller: 'OrbiterCtlr',
            model:'app'
        })
        ;
    })
    .controller('OrbiterCtlr', OrbiterCtlr)


    .directive('orbiterMenu', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/menu.html'
        };
    })
    .directive('propertyDialogue', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/property-dialogue.html'
        };
    })
    .directive('currentEventDialogue', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/current-event-dialogue.html'
        };
    })

    .directive('propertySelectorDialogue', function(OrbiterService, InteractiveService){
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
    })
    ;
})();
