(function () {
    'use strict';
    function templatesDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'templates-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('templatesDialogue', templatesDialogue);
})();
