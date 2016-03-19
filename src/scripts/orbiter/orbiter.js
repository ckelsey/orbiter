(function () {
    'use strict';

    function OrbiterCtlr($localStorage, $window, OrbiterService, OrbiterElementTypes, InteractiveService, $scope, OrbiterPropertyService){
        var self = this;
        this.$localStorage = $localStorage;
        if(!$localStorage.Orbiter){
            $localStorage.Orbiter = {};
        }
        this.OrbiterService = OrbiterService;
        this.OrbiterPropertyService = OrbiterPropertyService;
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

        this.isDialogueOpen = function(){
            self.dialogueOpen = false;
            if(self.OrbiterService.newDataObject || self.OrbiterService.propertyDialogue || self.OrbiterService.currentEventObject || self.OrbiterService.propertyMapperDialogue || self.OrbiterService.propertySelectorDialogue || self.OrbiterService.newTemplate || self.stagedNewProperty){
                self.dialogueOpen = true;
            }
        };

        $scope.$watch(function(){
            return self.OrbiterService.newDataObject;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.propertyDialogue;
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
            return self.OrbiterService.propertyMapperDialogue;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.propertySelectorDialogue;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.newTemplate;
        }, function(o,n){
            if(o !== n){
                self.isDialogueOpen();
            }
        });

        $scope.$watch(function(){
            return self.OrbiterService.stagedNewProperty;
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
    .directive('newTemplateDialogue', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/new-template-dialogue.html'
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

    .directive('htmlTree', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/html-tree.html'
        };
    })

    .directive('htmlTreeNode', function(){
        return {
            restrict: 'A',
            scope: {
                node: '=htmlTreeNode'
            },
            templateUrl: '../../html/orbiter/html-tree-node.html'
        };
    })
    .directive('propertyElement', function(){
        return {
            restrict: 'E',
            scope: {
                property: '=property',
                propertyKey: '=propertyKey',
                newProperty: '=newProperty',
                root: '=root',
                parent: '=parent'
            },
            templateUrl: '../../html/orbiter/property-element.html'
        };
    })
    .directive('newPropertyDialogue', function(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/new-property-dialogue.html'
        };
    })
    ;
})();
