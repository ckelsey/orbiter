(function () {
    'use strict';
    function orbiterCanvas(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/canvas.html'
        };
    }

    angular.module('app')
    .directive('orbiterCanvas', orbiterCanvas);
})();
