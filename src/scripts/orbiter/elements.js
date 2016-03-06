(function () {
    'use strict';
    function orbiterElements(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/elements.html'
        };
    }

    angular.module('app')
    .directive('orbiterElements', orbiterElements);
})();
