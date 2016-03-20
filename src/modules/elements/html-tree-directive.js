(function () {
    'use strict';
    function htmlTree(){
        return {
            restrict: 'E',
            templateUrl: 'html-tree-directive.html'
        };
    }

    angular.module('app')
    .directive('htmlTree', htmlTree);
})();
