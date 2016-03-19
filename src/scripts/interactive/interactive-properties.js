(function () {
    'use strict';
    function InteractiveProperties(){
        return {
            "Test string": {
                key: 'Test string',
                orbiterType: 'property',
                value: null,
                type: 'text',
                defaultValue: 'Hi! This is a testString'
            },
            "$$styleClasses":{
                body:{
                    color:{
                        key: "color",
                        value: "#333333"
                    },
                    "font-size":{
                        key: "font-size",
                        value: "14px"
                    },
                    "line-height":{
                        key: "line-height",
                        value: "21px"
                    },
                    "margin-top":{
                        key: "margin-top",
                        value: "0px"
                    },
                    "margin-bottom":{
                        key: "margin-bottom",
                        value: "0px"
                    },
                    "margin-left":{
                        key: "margin-left",
                        value: "0px"
                    },
                    "margin-right":{
                        key: "margin-right",
                        value: "0px"
                    },
                    "padding-top":{
                        key: "padding-top",
                        value: "0px"
                    },
                    "padding-bottom":{
                        key: "padding-bottom",
                        value: "0px"
                    },
                    "padding-left":{
                        key: "padding-left",
                        value: "0px"
                    },
                    "padding-right":{
                        key: "padding-right",
                        value: "0px"
                    }
                },
                button:{
                    color:{
                        key: "color",
                        value: "#FFFFFF"
                    },
                    "font-size":{
                        key: "font-size",
                        value: "14px"
                    },
                    "line-height":{
                        key: "line-height",
                        value: "21px"
                    },
                    "margin-top":{
                        key: "margin-top",
                        value: "0px"
                    },
                    "margin-bottom":{
                        key: "margin-bottom",
                        value: "0px"
                    },
                    "margin-left":{
                        key: "margin-left",
                        value: "0px"
                    },
                    "margin-right":{
                        key: "margin-right",
                        value: "3px"
                    },
                    "padding-top":{
                        key: "padding-top",
                        value: "7px"
                    },
                    "padding-bottom":{
                        key: "padding-bottom",
                        value: "7x"
                    },
                    "padding-left":{
                        key: "padding-left",
                        value: "14px"
                    },
                    "padding-right":{
                        key: "padding-right",
                        value: "14px"
                    }
                }
            }
        };
    }

    angular.module('app')
    .service('InteractiveProperties', InteractiveProperties);
})();
