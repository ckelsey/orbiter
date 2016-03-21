/*
- something to describe units of measurements
- binding all or individual properties?

- classes(global properties) only be able to be changed not on an element level?
*/
(function () {
    'use strict';
    function diplayProperties(OrbiterService, InteractiveService, $compile){
        return {
            restrict: 'E',
            link:function(scope,element,attributes){
                var availableStyles = ['display', 'background-color', 'box-shadow', 'border-radius', 'outline', 'overflow', 'cursor', 'vertical-align', 'z-index', 'transition'];
                var run = function() {
                    scope.diplayProperties = {};
                    for (var i=0;i<availableStyles.length;i++) {
                        var thisStyle = InteractiveService.lookUpPath(InteractiveService, InteractiveService.elementProperties.properties[availableStyles[i]].bind);
                        if(thisStyle){
                            scope.diplayProperties[availableStyles[i]] = thisStyle;
                        }
                    }

                    var html = ''+
                        '<div class="c-expandable" ng-class="diplayPropertiesToggled ? \'active\' : \'\'">'+
                            '<div class="c-expandable_toggler c-sidebar_section-wrapper_inner-section" ng-click="diplayPropertiesToggled ? diplayPropertiesToggled=false : diplayPropertiesToggled=true">Display</div>' +
                            '<div class="c-expandable_content">' +
                                '<div class="c-expandable_content-inner">' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-eye"></i></label>' +
                                            '<select ng-model="diplayProperties.display.value">' +
                                                '<option value="none">none</option>' +
                                                '<option value="block">block</option>' +
                                                '<option value="inline">inline</option>' +
                                                '<option value="inline-block">inline-block</option>' +
                                                '<option value="flex">flex</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                                '<option value=""></option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-external-link"></i></label>' +
                                            '<select ng-model="diplayProperties.overflow.value">' +
                                                '<option value="hidden">hidden</option>' +
                                                '<option value="scroll">scroll</option>' +
                                                '<option value="auto">auto</option>' +
                                                '<option value="initial">Initial</option>' +
                                                '<option value="inherit">Inherit</option>' +
                                                '<option value=""></option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-mouse-pointer"></i></label>' +
                                            '<select ng-model="diplayProperties.cursor.value">' +
                                                '<option value="auto">auto</option>' +
                                                '<option value="default">default</option>' +
                                                '<option value="none">none</option>' +
                                                '<option value="help">help</option>' +
                                                '<option value="pointer">pointer</option>' +
                                                '<option value="progress">progress</option>' +
                                                '<option value="wait">wait</option>' +
                                                '<option value="cell">cell</option>' +
                                                '<option value="crosshair">crosshair</option>' +
                                                '<option value="text">text</option>' +
                                                '<option value="vertical-text">vertical-text</option>' +
                                                '<option value="alias">alias</option>' +
                                                '<option value="copy">copy</option>' +
                                                '<option value="move">move</option>' +
                                                '<option value="no-drop">no-drop</option>' +
                                                '<option value="not-allowed">not-allowed</option>' +
                                                '<option value="all-scroll">all-scroll</option>' +
                                                '<option value="col-resize">col-resize</option>' +
                                                '<option value="row-resize">row-resize</option>' +
                                                '<option value="n-resize">n-resize</option>' +
                                                '<option value="e-resize">e-resize</option>' +
                                                '<option value="s-resize">s-resize</option>' +
                                                '<option value="w-resize">w-resize</option>' +
                                                '<option value="ne-resize">ne-resize</option>' +
                                                '<option value="nw-resize">nw-resize</option>' +
                                                '<option value="se-resize">se-resize</option>' +
                                                '<option value="sw-resize">sw-resize</option>' +
                                                '<option value="ew-resize">ew-resize</option>' +
                                                '<option value="ns-resize">ns-resize</option>' +
                                                '<option value="nesw-resize">nesw-resize</option>' +
                                                '<option value="nwse-resize">nwse-resize</option>' +
                                                '<option value="zoom-in">zoom-in</option>' +
                                                '<option value="zoom-out">zoom-out</option>' +
                                                '<option value="grab">grab</option>' +
                                                '<option value="grabbing">grabbing</option>' +
                                                '<option value=""></option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-arrows-v"></i></label>' +
                                            '<select ng-model="diplayProperties[\'vertical-align\'].value">' +
                                                '<option value="baseline">baseline</option>' +
                                                '<option value="sub">sub</option>' +
                                                '<option value="super">super</option>' +
                                                '<option value="text-top">text-top</option>' +
                                                '<option value="text-bottom">text-bottom</option>' +
                                                '<option value="middle">middle</option>' +
                                                '<option value="top">top</option>' +
                                                '<option value="bottom">bottom</option>' +
                                                '<option value=""></option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-circle-o"></i></label>' +
                                            '<input ng-model="diplayProperties[\'border-radius\'].value" type="text">' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label class="text">z</label>' +
                                            '<input ng-model="diplayProperties[\'z-index\'].value" type="text">' +
                                        '</div>' +
                                        '<div class="c-input-group">'+
                                            '<label><i class="fa fa-eyedropper"></i></label>' +
                                            '<a-ckolor model="diplayProperties[\'background-color\'].value" type="\'hidden\'"></a-ckolor>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Outline</label>' +
                                            '<input ng-model="diplayProperties[\'outline\'].value" type="text">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Shadow</label>' +
                                            '<input ng-model="diplayProperties[\'box-shadow\'].value" type="text">' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="c-input-row">'+
                                        '<div class="c-input-group full">'+
                                            '<label class="text">Transition</label>' +
                                            '<input ng-model="diplayProperties[\'transition\'].value" type="text">' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    element.html(html);
                    $compile(element.contents())(scope);
                };
                run();
                scope.$watch(function(){
                    return InteractiveService.elementProperties.id;
                }, function(o,n){
                    if(o!==n){
                        run();
                    }
                });
            }
        };
    }

    angular.module('app')
    .directive('diplayProperties', diplayProperties);
})();
