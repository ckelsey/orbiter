(function () {
    'use strict';
    function interactiveRepeater(InteractiveService, $compile){
        return {
            restrict: 'A',
            scope: {
                data: '=interactiveRepeater',
                repeaterIndex: '=repeaterIndex',
                repeaterPath: '=repeaterPath'
            },
            link:function(scope,element,attributes){
                scope.template = InteractiveService.lookUpPath(InteractiveService, scope.data.properties.template.bind);
                console.log(scope.data)
                scope.repeaterPath = scope.data.properties.repeat.bind;

                var html = '<el ng-controller="InteractiveCtlr as ictlr">';
                html += '<el';
                html += ' ng-repeat="data in template.nodes track by data.id"';
                html += ' interactive-node="data"';
                html += ' repeater-index="repeaterIndex"';
                html += ' repeater-path="repeaterPath"';
                html += ' interactive-node-parent="template"';
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
