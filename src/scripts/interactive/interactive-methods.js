(function () {
    'use strict';
    function InteractiveMethods(){
        return {
            logTestString:{
                key: 'logTestString',
                label: 'Log test string property',
                arguments:{
                    logme:{
                        keyPath: 'properties.testString.value',
                        value: null
                    }
                },
                fn:'console.log(logme);'
            }
        };
    }

    angular.module('app')
    .service('InteractiveMethods', InteractiveMethods);
})();
