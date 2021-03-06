(function () {
    'use strict';

    function OrbiterCtlr($localStorage, $window, $scope, OrbiterService, OrbiterElementTypes, OrbiterPropertyService, OrbiterElementsService, OrbiterLibrariesService, OrbiterTemplatesService, InteractiveService){
        var self = this;
        this.$localStorage = $localStorage;
        if(!$localStorage.Orbiter){
            $localStorage.Orbiter = {};
        }
        this.OrbiterService = OrbiterService;
        this.OrbiterPropertyService = OrbiterPropertyService;
        this.OrbiterElementsService = OrbiterElementsService;
        this.OrbiterLibrariesService = OrbiterLibrariesService;
        this.OrbiterTemplatesService = OrbiterTemplatesService;
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
            try{
                if(thing instanceof HTMLElement){
                    return 'DOM';
                }else if(typeof thing === 'undefined'){
                    return 'undefined';
                }else if(typeof thing === 'function'){
                    return 'function';
                }else if(typeof thing === 'number'){
                    return 'number';
                }else if(typeof thing === 'boolean'){
                    return 'boolean';
                }else if(thing instanceof Object){
                    return 'object';
                }else if(thing instanceof Array){
                    return 'array';
                }else{
                    return 'string';
                }
            }catch(e){
                return true;
            }

            return true;
        };

        this.typeOfSafe = function(obj, key){
            return self.typeOf(obj[key]);
        };

        this.dialogueOpen = false;

        this.isDialogueOpen = function(){
            self.dialogueOpen = false;
            var openDialogueFlags = [
                self.OrbiterService.dialogueModelType,
                self.OrbiterService.currentEventObject,
                self.OrbiterService.projectDataDialogue,
                self.OrbiterTemplatesService.newTemplate,
                self.OrbiterService.propertyMapperDialogue,
                self.OrbiterPropertyService.stagedProperty
            ];
            for(var f=0;f<openDialogueFlags.length;f++){
                if(openDialogueFlags[f]){
                    self.dialogueOpen = true;
                    break;
                }
            }
        };

        $scope.$watch(function(){
            return self.OrbiterService.propertyMapperDialogue;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.dialogueModelType;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.currentEventObject;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.projectDataDialogue;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterTemplatesService.newTemplate;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterPropertyService.stagedProperty;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
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

    .directive('currentEventDialogue', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/current-event-dialogue.html'
        };
    })
    .directive('interactiveTask', function(){
        return {
            restrict: 'E',
            scope: {
                task: '=task',
                tasks: '=tasks',
                key: '=key'
            },
            templateUrl: '../../html/orbiter/task.html'
        };
    })
    .directive('dropDown', function(){
        return {
            restrict: 'E',
            scope: {
                model: '=model',
                key: '@key',
                defaultValue: '@default',
                options: '=options'
            },
            templateUrl: '../../html/orbiter/drop-down.html'
        };
    })

    ;
})();
