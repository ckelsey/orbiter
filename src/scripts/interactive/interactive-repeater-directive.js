(function () {
    'use strict';
    function interactiveRepeater(InteractiveService, $compile){
        return {
            restrict: 'A',
            scope: {
                data: '=interactiveRepeater'
            },
            link:function(scope,element,attributes){
                scope.template = InteractiveService.lookUpPath(InteractiveService, scope.data.properties.template.bind);
                var html = '<el ng-controller="InteractiveCtlr as ictlr">';
                html += '<el';
                html += ' ng-repeat="data in template.nodes track by data.id"';
                html += ' interactive-node="data"';
                html += ' interactive-node-parent="template"';
                html += ' ng-init="path = $index"';
                html += ' interactive-node-parent-path="path"';
                html += '>';
                html += '</el>';
                html += '</el>';
                element.html(html);
                $compile(element.contents())(scope);
            }
        };
    }

    angular.module('app')
    .directive('interactiveRepeater', interactiveRepeater);
})();
