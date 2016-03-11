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

        this.draggingElement = function(e, data){
            console.log(e, data)
        };

        this.debug = function(msg){
            console.log(msg)
            return msg;
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
    ;
})();
