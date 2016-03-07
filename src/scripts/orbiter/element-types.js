(function () {
    'use strict';
    function OrbiterElementTypes(){
        var textProperties = {
            text: {
                type:'textarea',
                value: 'Text'
            },
            color: {
                type:'color',
                value: "#30363B"
            },
            "font-size": {
                type:'select',
                options: ['3px', '5px', '7px', '8px', '9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px', '22px', '24px', '28px', '32px'],
                value: null
            },
            "font-weight": {
                type: 'select',
                options: ['light', 'normal', 'bold'],
                value: null
            },
            display: {
                type: 'select',
                options: ['block', 'inline'],
                value: 'inline'
            },
            "text-align": {
                type: 'select',
                options: ['left', 'center', 'right'],
                value: null
            }
        };

        var linkProperties = angular.copy(textProperties);
        linkProperties.url = {type: 'text', value: null};

        var buttonProperties = angular.copy(textProperties);
        buttonProperties['background-color'] = { type:'color', value: "#68BCD8" };


        return {
            block:{
                label: 'Block',
                properties: {
                    display: {
                        type: 'select',
                        options:['block', 'inline'],
                        value: 'inline'
                    }
                },
                tag:{
                    block: 'p',
                    inline: 'span'
                }
            },

            text:{
                label: 'Text',
                properties: textProperties
            },

            link:{
                label: 'Link',
                properties: linkProperties
            },

            button:{
                label: 'Button',
                properties: buttonProperties
            },

            list:{
                label: 'List'
            },

            filter:{
                label: 'Filter'
            },

            media:{
                label: 'Media'
            }
        };
    }

    angular.module('app')
    .service('OrbiterElementTypes', OrbiterElementTypes);
})();