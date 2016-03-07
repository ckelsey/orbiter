(function () {
    'use strict';

    function OrbiterCtlr($localStorage, $window, OrbiterService, OrbiterElementTypes, InteractiveService){
        var self = this;
        this.$localStorage = $localStorage;
        if(!$localStorage.Orbiter){
            $localStorage.Orbiter = {};
        }
        this.OrbiterService = OrbiterService;
        this.OrbiterElementTypes = OrbiterElementTypes;
        this.InteractiveService = InteractiveService;

        this.trackingMouseMove = false;
        this.mouseMoveMethod = null;
        this.sizingElement = null;

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
    .controller('OrbiterCtlr', OrbiterCtlr);
})();
