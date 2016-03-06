(function () {
    'use strict';

    function InteractiveCtlr(InteractiveService){
        var self = this;
        this.InteractiveService = InteractiveService;
        this.debug = function(msg){
            console.log(msg)
        };
    }

    angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            title: '',
            templateUrl: '../../html/interactive/main.html',
            controller: 'InteractiveCtlr',
            model:'app'
        })
        ;
    })
    .controller('InteractiveCtlr', InteractiveCtlr);
})();
