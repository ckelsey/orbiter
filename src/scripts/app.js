(function () {
    'use strict';

    function AppCtlr(){
        var self = this;
    }

    angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'ngStorage'
    ])
    .controller('AppCtlr', AppCtlr);
})();
