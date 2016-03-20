(function () {
    'use strict';
    function librariesDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'libraries-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('librariesDialogue', librariesDialogue);
})();
