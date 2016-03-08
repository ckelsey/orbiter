(function () {
    'use strict';
    function OrbiterElementTypes(){
        var textProperties = {
            data: {
                type: 'text',
                value: null,
                bind: null
            },
            text: {
                type:'textarea',
                value: 'Text',
                bind: null
            },
            color: {
                type:'color',
                value: "#30363B",
                bind: null
            },
            "font-size": {
                type:'select',
                options: ['3px', '5px', '7px', '8px', '9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px', '22px', '24px', '28px', '32px'],
                value: null,
                bind: null
            },
            "font-weight": {
                type: 'select',
                options: ['light', 'normal', 'bold'],
                value: null,
                bind: null
            },
            display: {
                type: 'select',
                options: ['block', 'inline'],
                value: 'inline',
                bind: null
            },
            "text-align": {
                type: 'select',
                options: ['left', 'center', 'right'],
                value: null,
                bind: null
            }
        };

        var linkProperties = angular.copy(textProperties);
        linkProperties.url = {
            type: 'text',
            value: null,
            bind: null
        };

        var buttonProperties = angular.copy(textProperties);
        buttonProperties['background-color'] = {
            type:'color',
            value: "#68BCD8",
            bind: null
        };


        var basicEvents = {
            click:{
                label: null,
                method: 'ng-click',
                fn: []
            },
            "Mouse down":{
                label: null,
                method: 'ng-mousedown',
                fn: []
            },
            "Mouse move":{
                label: null,
                method: 'ng-mousemove',
                fn: []
            }
        };


        return {
            block:{
                label: 'Block',
                properties: {
                    display: {
                        type: 'select',
                        options:['block', 'inline'],
                        value: 'block',
                        bind: null
                    }
                },
                events: basicEvents
            },

            text:{
                label: 'Text',
                properties: textProperties,
                events: basicEvents
            },

            link:{
                label: 'Link',
                properties: linkProperties,
                events: basicEvents
            },

            button:{
                label: 'Button',
                properties: buttonProperties,
                events: basicEvents
            }
/*
            list:{
                label: 'List'
            },

            filter:{
                label: 'Filter'
            },

            media:{
                label: 'Media'
            }
            */
        };
    }

    angular.module('app')
    .service('OrbiterElementTypes', OrbiterElementTypes);
})();
