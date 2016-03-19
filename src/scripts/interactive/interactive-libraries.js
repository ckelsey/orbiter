(function () {
    'use strict';
    function InteractiveLibraries(){
        return {
            "jQuery": jQuery,
            "mflyCommands": mflyCommands
        };
    }

    angular.module('app')
    .service('InteractiveLibraries', InteractiveLibraries);
})();
