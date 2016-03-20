(function () {
    'use strict';
    function interactiveNode(InteractiveService, OrbiterService, OrbiterElementsService, $timeout, $compile){
        return {
            restrict: 'A',
            scope: {
                'data': '=interactiveNode',
                'parent': '=interactiveNodeParent',
                'repeaterIndex': '=repeaterIndex',
                'repeaterPath': '=repeaterPath'
            },
            //templateUrl: 'interactive-node-directive.html',
            link:function(scope,element,attributes){

                //scope.repeatObj = InteractiveService.getBinding(scope.dataProperties, 'repeat');
                function run() {
                    scope.dataProperties = angular.copy(InteractiveService.elements[scope.data.id]);
                    scope.styles = InteractiveService.getStyles(scope.dataProperties);
                    scope.mock = ['test', 'test2'];
                    scope.repeaterPathArray = [];
                    if(scope.repeaterPath){
                        scope.repeaterPathArray = scope.repeaterPath.split('.');
                    }

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

                    var setRepeat = function(){
                        if(scope.repeaterIndex !== undefined && scope.repeaterIndex !== null){
                            html += ' repeater-index="repeaterIndex" repeater-path="repeaterPath"';
                            for(var property in scope.dataProperties.properties){
                                var originalBindingArray = scope.dataProperties.properties[property].bind.split('.');
                                var needsUpdatedBinding = false;
                                for(var i=0;i<scope.repeaterPathArray.length;i++){
                                    if(scope.repeaterPathArray[i] !== originalBindingArray[0]){
                                        needsUpdatedBinding = false;
                                        break;
                                    }else{
                                        originalBindingArray.shift();
                                        needsUpdatedBinding = true;
                                    }
                                }

                                if(needsUpdatedBinding){
                                    var newBindingArray = angular.copy(scope.repeaterPathArray);
                                    newBindingArray.push(scope.repeaterIndex);
                                    originalBindingArray.shift();
                                    newBindingArray = newBindingArray.concat(originalBindingArray);
                                    var newBinding = newBindingArray.join('.');
                                    scope.dataProperties.properties[property].bind = newBinding;
                                }
                            }
                        }
                    };

                    var setText = function(){
                        if(scope.dataProperties.label === 'Text' || scope.dataProperties.label === 'Link' || scope.dataProperties.label === 'Button'){
                            html += '<span ng-bind-html="ictlr.InteractiveService.getBinding(dataProperties, \'text\')" class="c-interactive-bound"></span>';
                        }
                    };

                    var setChildren = function(){
                        html += '<el ng-repeat="childData in data.nodes track by childData.id"';
                        setRepeat();
                        html += ' interactive-node="childData"';
                        html += ' interactive-node-parent="data"';
                        html += ' ng-style="ictlr.InteractiveService.getStyles(ictlr.InteractiveService.elements[childData.id], \'display\')"';
                        html += ' ng-class="childData.id === ictlr.InteractiveService.elementProperties.id ? \'m-active-iteractive-node\' : \'\'"';
                        html += '></el>';
                    };

                    var setHTML = function(){
                        setCTLR();
                        setRepeat();
                        setStyles();
                        setEvents();
                        setID();
                        html += '>';
                        setText();
                        setChildren();
                    };

                    if(scope.dataProperties.label === 'Block'){
                        html += '<div';
                        setHTML();
                        html += '</div>';
                    }else if(scope.dataProperties.label === 'Text'){
                        html += '<el';
                        setHTML();
                        html += '</el>';
                    }else if(scope.dataProperties.label === 'Link'){
                        html += '<a href="{{ictlr.InteractiveService.getBinding(dataProperties, \'href\')}}"';
                        setHTML();
                        html += '</a>';
                    }else if(scope.dataProperties.label === 'Image'){
                        html += '<img src="{{ictlr.InteractiveService.getBinding(dataProperties, \'src\')}}"';
                        setHTML();
                    }else if(scope.dataProperties.label === 'Button'){
                        html += '<button';
                        setHTML();
                        html += '</button>';
                    }else if(scope.dataProperties.label === 'Repeat'){
                        scope.repeatObj = InteractiveService.getBinding(scope.dataProperties, 'repeat');
                        scope.repeatTemplate = InteractiveService.getBinding(scope.dataProperties, 'template');
                        html += '<el';
                        setRepeat();
                        setEvents();
                        setID();
                        html += ' ng-repeat="(repKey, rep) in repeatObj track by $index" repeater-index="repKey" interactive-repeater="dataProperties" repeater-path="repeaterPath">';
                        html += '</el>';
                    }

                    element.html(html);
                    $compile(element.contents())(scope);
                }

                run();

                scope.$watchCollection(function(){
                    return InteractiveService.getBinding(InteractiveService.elements[scope.data.id], 'repeat');
                }, function(n,o){
                    if(o !== n){
                        run();
                    }
                });





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
                            OrbiterElementsService.addToInteractive(scope.data, OrbiterService.dragging);
                        });
                        return false;
                    });

                    element.bind("click", function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        $timeout(function(){
                            OrbiterElementsService.activeProperties(scope.dataProperties);
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
