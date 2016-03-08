(function () {
    'use strict';
    function orbiterSidebar(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/sidebar.html'
        };
    }

    angular.module('app')
    .directive('orbiterSidebar', orbiterSidebar);
})();
