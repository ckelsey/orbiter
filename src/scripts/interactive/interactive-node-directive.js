(function () {
    'use strict';
    function interactiveNode(InteractiveService, OrbiterService, $timeout, $compile){
        return {
            restrict: 'A',
            scope: {
                'data': '=interactiveNode',
                'parent': '=interactiveNodeParent',
                'parentPath': '=interactiveNodeParentPath'
            },
            link:function(scope,element,attributes){
                scope.dataProperties = InteractiveService.properties[scope.data.id];
                scope.styles = InteractiveService.getStyles(scope.dataProperties);

                var html = '';

                var setCTLR = function(){
                    html += ' ng-controller="InteractiveCtlr as ictlr"';
                };

                var setStyles = function(){
                    html += ' ng-style="ictlr.InteractiveService.getStyles(dataProperties)"';
                };

                var setEvents = function(){
                    for(var ev in scope.dataProperties.events){
                        if(scope.dataProperties.events[ev].fn && scope.dataProperties.events[ev].fn.length){
                            html += scope.dataProperties.events[ev].method +'="ictlr.InteractiveService.runFN(dataProperties.events[\''+ ev +'\'])" ';
                        }
                    }
                };

                var setID = function(){
                    html += ' interactive-id="'+ scope.dataProperties.id +'"';
                };

                var setText = function(){
                    if(scope.dataProperties.label === 'Text' || scope.dataProperties.label === 'Link' || scope.dataProperties.label === 'Button'){
                        html += '<span ng-bind-html="ictlr.InteractiveService.getBinding(dataProperties, \'text\')" class="c-interactive-bound"></span>';
                    }
                };

                var setChildren = function(){
                    html += '<div ng-repeat="childData in data.nodes track by $index"';
                    html += ' interactive-node="childData"';
                    html += ' interactive-node-parent="data"';
                    html += ' ng-init="thisPath=parentPath + \',nodes,\' + $index"';
                    html += ' interactive-node-parent-path="thisPath"';
                    html += ' path="{{thisPath}}"';
                    html += ' ng-style="ictlr.InteractiveService.getStyles(ictlr.InteractiveService.properties[childData.id], \'display\')"';
                    html += ' ng-class="childData.id === ictlr.InteractiveService.elementProperties.id ? \'m-active-iteractive-node\' : \'\'"';
                    html += '></div>';
                };

                var setHTML = function(){
                    setCTLR();
                    setStyles();
                    setEvents();
                    setID();
                    html += '>';
                    setText();
                    setChildren();
                };

                if(scope.dataProperties.label === 'Block' || scope.dataProperties.label === 'Text'){
                    html += '<div';
                    setHTML();
                    html += '</div>';
                }else if(scope.dataProperties.label === 'Link'){
                    html += '<a href="{{ictlr.InteractiveService.getBinding(dataProperties, \'url\')}}"';
                    setHTML();
                    html += '</a>';
                }else if(scope.dataProperties.label === 'Button'){
                    html += '<button';
                    setHTML();
                    html += '</button>';
                }

                element.html(html);
                $compile(element.contents())(scope);



                if(InteractiveService.developer){
                    var preventableElement = angular.element(element[0].firstElementChild);

                    element.bind("dragover", function(e) {
                        e.preventDefault();
                        element.addClass(attributes.orbiterAcceptDrop? InteractiveService.canAccept(attributes.orbiterAcceptDrop) : InteractiveService.canAcceptDragClass)
                    });

                    element.bind("dragleave", function(e) {
                        element.removeClass(InteractiveService.canAcceptDragClass)
                    });

                    element.bind("drop", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $timeout(function(){
                            angular.element(document.querySelectorAll('.'+InteractiveService.canAcceptDragClass)).removeClass(InteractiveService.canAcceptDragClass);
                            OrbiterService.addToInteractive(scope.data, OrbiterService.dragging);
                        });
                        return false;
                    });

                    element.bind("click", function(e){
                        e.stopPropagation();
                        $timeout(function(){
                            OrbiterService.activeProperties(scope.dataProperties);
                        });
                    });

                    preventableElement.bind("click", function(e){
                        e.preventDefault();
                        // e.stopPropagation();
                    });
                }
            }
        };
    }

    angular.module('app')
    .directive('interactiveNode', interactiveNode);
})();
