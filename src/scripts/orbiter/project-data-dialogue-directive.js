(function () {
    'use strict';
    function projectDataDialogue(){
        return {
            restrict: 'E',
            templateUrl: '../../html/orbiter/project-data-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('projectDataDialogue', projectDataDialogue);
})();
