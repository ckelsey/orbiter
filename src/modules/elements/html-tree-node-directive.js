(function () {
    'use strict';
    function htmlTreeNode(){
        return {
            restrict: 'A',
            scope: {
                node: '=htmlTreeNode'
            },
            templateUrl: 'html-tree-node-directive.html'
        };
    }

    angular.module('app')
    .directive('htmlTreeNode', htmlTreeNode);
})();
