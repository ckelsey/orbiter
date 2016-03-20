(function () {
    'use strict';
    function propertyDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'property-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('propertyDialogue', propertyDialogue);
})();
