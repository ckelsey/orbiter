(function () {
    'use strict';
    function elementsDialogue(){
        return {
            restrict: 'E',
            templateUrl: 'elements-dialogue-directive.html'
        };
    }

    angular.module('app')
    .directive('elementsDialogue', elementsDialogue);
})();
