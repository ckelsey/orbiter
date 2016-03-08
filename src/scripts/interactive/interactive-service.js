(function () {
    'use strict';

    function InteractiveService(InteractiveStyles, InteractiveProperties, InteractiveMethods, $localStorage){
        var self = {
            developer: false,
            elementProperties: null,
            propertyPrefix: '!@#$%^&*()|',

            htmlTree: {},
            properties:{},
            methods:{},


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
                        if(InteractiveStyles.hasOwnProperty(rule)){
                            var ruleName = rule;
                            var val = self.getBinding(data, rule);// props[rule].value;
                            ruleName = InteractiveStyles[rule].ruleName;

                            if(InteractiveStyles[rule].hasOwnProperty('transform') && InteractiveStyles[rule].transform.hasOwnProperty(val)){
                                val = InteractiveStyles[rule].transform[val];
                            }

                            if(InteractiveStyles[rule].hasOwnProperty('append')){
                                val = val + InteractiveStyles[rule].append;
                            }

                            if(val && val !== 'null'){
                                style[ruleName] = val;
                            }
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
            },

            getBinding: function(obj, key){
                var val = self.lookUpPath(self.properties, obj.properties[key].bind);
                if(val){
                    val = val.value;
                }
                return val;
            },

            lookUpPath: function(obj, pathString){
                if(pathString){
                    var path = pathString.split('.');
                    if(path.length == 1){
                        return obj[path[0]];
                    }
                    return self.lookUpPath(obj[path[0]], path.slice(1).join("."));
                }else{
                    return null;
                }
            },

            runFN: function(data){
                if(!self.developer){
                    for(var f=0;f<data.fn.length;f++){
                        var thisFN = data.fn[f];
                        if(thisFN.property){
                            self.properties[thisFN.property.key].value = thisFN.newValue;
                        }else if(thisFN.method){
                            var thisMethod = self.methods[thisFN.method.key];
                            var thisArguments = [];
                            var thisArgumentsKeys = [];
                            for(var a in thisMethod.arguments){
                                thisArgumentsKeys.push(a);
                                var path = thisMethod.arguments[a].keyPath.split('.');
                                var thisVal = self;
                                for(var p=0;p<path.length;p++){
                                    thisVal = thisVal[path[p]];
                                }

                                thisArguments.push(thisVal);
                            }
                            var method = new Function(thisArgumentsKeys, thisMethod.fn);
                            method.apply(this, thisArguments);
                        }
                    }
                }
            }
        };

        return self;
    }

    angular.module('app').service('InteractiveService', InteractiveService);
})();
