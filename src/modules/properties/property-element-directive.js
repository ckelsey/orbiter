(function () {
    'use strict';
    function propertyElement(){
        return {
            restrict: 'E',
            scope: {
                property: '=property',
                propertyKey: '=propertyKey',
                newProperty: '=newProperty',
                root: '=root',
                parent: '=parent',
                path: '=path'
            },
            templateUrl: 'property-element-directive.html'
        };
    }

    angular.module('app')
    .directive('propertyElement', propertyElement);
})();
