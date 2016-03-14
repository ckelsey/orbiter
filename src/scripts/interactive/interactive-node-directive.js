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
                var thisData = scope.data;
                var html = '';
                var styles = InteractiveService.getStyles(thisData);

                if(thisData.label === 'Block' || thisData.label === 'Text'){
                    html += '<div ';
                }else if(thisData.label === 'Link'){
                    html += '<a href="{{ictlr.InteractiveService.getBinding(data, \'url\')}}" ';
                }else if(thisData.label === 'Button'){
                    html += '<button ';
                }

                html += 'ng-controller="InteractiveCtlr as ictlr" ng-style="ictlr.InteractiveService.getStyles(data)';
                html += '" ';

                for(var ev in thisData.events){
                    if(thisData.events[ev].fn && thisData.events[ev].fn.length){
                        html += thisData.events[ev].method +'="ictlr.InteractiveService.runFN(data.events[\''+ ev +'\'])" ';
                    }
                }

                html += 'interactive-id="'+ thisData.id +'"';
                html += '>';

                if(thisData.label === 'Text' || thisData.label === 'Link' || thisData.label === 'Button'){
                    html += '<span ng-bind-html="ictlr.InteractiveService.getBinding(data, \'text\')" class="c-interactive-bound"></span>';
                }

                html += '<div ng-repeat="childData in data.nodes track by $index"';
                html += ' interactive-node="childData"';
                html += ' interactive-node-parent="data"';
                html += ' ng-init="thisPath=parentPath + \',nodes,\' + $index"';
                html += ' interactive-node-parent-path="thisPath"';
                html += ' path="{{thisPath}}"';
                html += ' ng-style="ictlr.InteractiveService.getStyles(childData, \'display\')"';
                html += ' ng-class="childData.id === ictlr.InteractiveService.elementProperties.id ? \'m-active-iteractive-node\' : \'\'"';
                html += '></div>';


                if(thisData.label === 'Block' || thisData.label === 'Text'){
                    html += '</div>';
                }else if(thisData.label === 'Link'){
                    html += '</a>';
                }else if(thisData.label === 'Button'){
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
                            OrbiterService.activeProperties(scope.data);
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
