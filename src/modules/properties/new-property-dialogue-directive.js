(function () {
    'use strict';
    function newPropertyDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'new-property-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('newPropertyDialogue', newPropertyDialogue);
})();
