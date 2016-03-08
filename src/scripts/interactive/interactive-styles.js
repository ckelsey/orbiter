(function () {
    'use strict';
    function InteractiveStyles(){
        return {
            display:{
                ruleName: 'display',
                transform: {
                    inline: 'inline-block'
                }
            },
            color:{
                ruleName: 'color'
            },
            "font-size":{
                ruleName: "font-size"
            },
            size: {
                ruleName: "font-size"
            },
            "font-weight": {
                ruleName: "font-weight"
            },
            weight: {
                ruleName: "font-weight"
            },
            "text-align": {
                ruleName: "text-align"
            },
            align: {
                ruleName: "text-align"
            }
        };
    }

    angular.module('app')
    .service('InteractiveStyles', InteractiveStyles);
})();
