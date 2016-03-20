(function () {
    'use strict';
    function newTemplateDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'new-template-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('newTemplateDialogue', newTemplateDialogue);
})();
