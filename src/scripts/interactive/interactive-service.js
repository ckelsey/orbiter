(function () {
    'use strict';

    function InteractiveService(InteractiveStyles, $localStorage){
        var self = {
            developer: false,
            htmlTree: {
                nodes:[
                    {
                        id: '_root_',
                        label: 'Block',
                        properties: {
                            display: {
                                type: 'select',
                                options:['block', 'inline'],
                                value: 'block'
                            }
                        },
                        tag:{
                            block: 'p',
                            inline: 'span'
                        },
                        nodes: []
                    }
                ]
            },
            dragging: null,
            canAcceptDragClass: 'c-drag_can-accept',
            canAccept: function(accepts){
                try{accepts = JSON.parse(accepts);}catch(e){}

                if(accepts && typeof accepts === 'object' && self.dragging){
                    if(!accepts.length){
                        return self.canAcceptDragClass;
                    }
                }
            },

            getStyles: function(data, rule){
                if(data && data.hasOwnProperty('properties')){
                    var props = data.properties;
                    var style = {};

                    var processStyle = function(rule){
                        var ruleName = rule;
                        var val = props[rule].value;
                        if(InteractiveStyles.hasOwnProperty(rule)){
                            ruleName = InteractiveStyles[rule].ruleName;
                            if(InteractiveStyles[rule].hasOwnProperty('transform') && InteractiveStyles[rule].transform.hasOwnProperty(val)){
                                val = InteractiveStyles[rule].transform[val];
                            }

                            if(InteractiveStyles[rule].hasOwnProperty('append')){
                                val = val + InteractiveStyles[rule].append;
                            }
                        }

                        if(val !== 'null'){
                            style[ruleName] = val;
                        }
                    };

                    if(rule){
                        if(props.hasOwnProperty(rule) && props[rule].value){
                            processStyle(rule);
                        }
                    }else{
                        for(var p in props){
                            processStyle(p);
                        }
                    }
                    return style;
                }else{
                    return false;
                }
            }
        };

        if($localStorage.hasOwnProperty('OrbiterInteractive') && $localStorage.OrbiterInteractive && $localStorage.OrbiterInteractive.hasOwnProperty('htmlTree')){
            self.htmlTree = $localStorage.OrbiterInteractive.htmlTree;
        }

        return self;
    }

    angular.module('app').service('InteractiveService', InteractiveService);
})();
