(function () {
    'use strict';

    function InteractiveService(InteractiveStyles, InteractiveProperties, InteractiveMethods, InteractiveLibraries, $localStorage, $timeout){
        var self = {
            developer: false,
            propertyPrefix: '!@#$%^&*()|',

            htmlTree: {},
            properties: {},
            elements: {},
            methods: {},
            libraries: {},


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

            styles: InteractiveStyles,
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
                var val = self.lookUpPath(self, obj.properties[key].bind);
                if(val){
                    return val.value;
                }else{
                    return null;
                }
            },

            lookUpPath: function(obj, pathString){
                if(pathString){
                    var path = pathString.split('.');

                    if(path.length == 1){
                        try{
                            return obj[path[0]];
                        }catch(e){
                            return null;
                        }
                    }
                    return self.lookUpPath(obj[path[0]], path.slice(1).join("."));
                }else{
                    return null;
                }
            },

            findElement: function(obj, id){
                if(id === obj.id){
                    return obj;
                }else{
                    for(var i=0;i<obj.nodes.length;i++){
                        var result = self.findElement(obj.nodes[i], id);
                        if(result){
                            return result;
                        }
                    }
                    return false;
                }
            },

            runFN: function(data){
                var setFunction = function(thisFN, passedData){
                    var target = self.lookUpPath(self, thisFN.target);
                    var newVal = thisFN.valueType === 'custom text' ? thisFN.value : self.lookUpPath(self, thisFN.value);

                    try{
                        if(passedData !== undefined && newVal.split('$RESULT$').length > 1){
                            newVal = passedData;
                        }
                    }catch(e){}

                    if(target){
                        if(target.hasOwnProperty('bind')){
                            target.bind = thisFN.value;
                        }

                        $timeout(function(){
                            target.value = newVal.hasOwnProperty('value') ? newVal.value : newVal;
                        });
                    }
                };

                var runFunction = function(thisFN, passedData){
                    var target = self.lookUpPath(self, thisFN.target);
                    var argumentArray = [];
                    for(var a=0;a<thisFN.arguments.length;a++){
                        if(thisFN.arguments[a].type === 'custom text'){
                            var arg = thisFN.arguments[a].value;
                            try{
                                arg = JSON.parse(thisFN.arguments[a].value);
                            }catch(e){}
                            argumentArray.push(arg);
                        }
                    }

                    var fun = target.apply(this, argumentArray);

                    if(thisFN.hasOwnProperty('promises') && thisFN.promises.length){
                        for(var p=0;p<thisFN.promises.length;p++){
                            (function(thisPromise) {
                                if(fun.hasOwnProperty(thisPromise.promiseType)){
                                    fun[thisPromise.promiseType](function(res){
                                        go(thisPromise, res);
                                    });
                                }
                            })(thisFN.promises[p]);
                        }
                    }
                };

                var go = function(thisFN, passedData){
                    switch (thisFN.type) {
                        case 'set':
                            setFunction(thisFN, passedData);
                            break;
                        case 'run':
                            runFunction(thisFN, passedData);
                            break;
                    }
                }

                if(!self.developer){
                    for(var f=0;f<data.fn.length;f++){
                        go(data.fn[f]);
                    }
                }
            }
        };

        return self;
    }

    angular.module('app').service('InteractiveService', InteractiveService);
})();
