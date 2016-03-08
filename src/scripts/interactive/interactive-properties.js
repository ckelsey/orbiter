(function () {
    'use strict';
    function InteractiveProperties(){
        return {
            testString: {
                key: 'testString',
                label: 'Test string',
                value: 'Hi! This is a testString'
            }
        };
    }

    angular.module('app')
    .service('InteractiveProperties', InteractiveProperties);
})();
