(function () {
    'use strict';
    function interactiveModel(InteractiveService, OrbiterService, $timeout){
        return {
            restrict: 'A',
            scope:{
                interactiveModel: '=interactiveModel'
            },
            link:function(scope,element,attributes){
                element.bind('input', function(e){
                    console.log(scope.interactiveModel)
                    $timeout(function(){
                        var bindedTo = null;
                        var path = scope.interactiveModel.element.properties[scope.interactiveModel.propertyKey].bind.split('.');
                        var val = null;
                        for(var p=0;p<path.length;p++){
                            if(p===0){
                                val = InteractiveService.properties;
                            }
                            val = val[path[p]];
                        }
                        val.value = e.target.textContent;
                    });
                });
            }
        };
    }

    angular.module('app')
    .directive('interactiveModel', interactiveModel);
})();
