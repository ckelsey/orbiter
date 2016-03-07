(function () {
    'use strict';
    function InteractiveStyles(){
        return {
            display:{
                ruleName: 'display',
                transform: {
                    inline: 'inline-block'
                }
            }
        };
    }

    angular.module('app')
    .service('InteractiveStyles', InteractiveStyles);
})();
