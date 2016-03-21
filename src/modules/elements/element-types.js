(function() {
    'use strict';

    function OrbiterElementTypes() {
        var borderStyleOptions = ['dashed', 'dotted', 'double', 'groove', 'hidden', 'inherit', 'inset', 'none', 'outset', 'ridge', 'solid'];
        var textProperties = {
            text: {
                value: 'Text',
                bind: null
            },

            /* TEXT */
            color: {
                value: null,
                bind: null
            },
            "font-size": {
                value: null,
                bind: null
            },
            "font-weight": {
                value: null,
                bind: null
            },
            "font-style": {
                value: null,
                bind: null
            },
            "text-decoration": {
                value: null,
                bind: null
            },
            "text-align": {
                value: null,
                bind: null
            },
            "line-height": {
                value: null,
                bind: null
            },




            /* SPACING */
            "padding-top": {
                value: '0px',
                bind: null
            },
            "padding-right": {
                value: '0px',
                bind: null
            },
            "padding-bottom": {
                value: '0px',
                bind: null
            },
            "padding-left": {
                value: '0px',
                bind: null
            },

            "margin-top": {
                value: '0px',
                bind: null
            },
            "margin-right": {
                value: '0px',
                bind: null
            },
            "margin-bottom": {
                value: '0px',
                bind: null
            },
            "margin-left": {
                value: '0px',
                bind: null
            },




            "background-color": {
                value: null,
                bind: null
            },

            display: {
                value: null,
                bind: null
            },

            "box-shadow": {
                value: null,
                bind: null
            },

            "border-radius": {
                value: null,
                bind: null
            },

            overflow: {
                value: null,
                bind: null
            },

            cursor: {
                value: null,
                bind: null
            },

            "vertical-align": {
                value: null,
                bind: null
            },

            "outline": {
                value: null,
                bind: null
            },

            "z-index":{
                value: null,
                bind: null
            },

            "transition":{
                value: null,
                bind: null
            },





            width: {
                value: null,
                bind: null
            },

            "max-width": {
                value: null,
                bind: null
            },

            "min-width": {
                value: null,
                bind: null
            },

            height: {
                value: null,
                bind: null
            },

            "max-height": {
                value: null,
                bind: null
            },

            "min-height": {
                value: null,
                bind: null
            },






            position: {
                value: null,
                bind: null
            },

            top: {
                value: null,
                bind: null
            },

            bottom: {
                value: null,
                bind: null
            },

            left: {
                value: null,
                bind: null
            },

            right: {
                value: null,
                bind: null
            },

            transform: {
                value: null,
                bind: null
            },







            "border-top-color": {
                value: 'transparent',
                bind: null
            },

            "border-top-width": {
                value: '0px',
                bind: null
            },

            "border-top-style": {
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-bottom-color": {
                value: 'transparent',
                bind: null
            },

            "border-bottom-width": {
                value: '0px',
                bind: null
            },

            "border-bottom-style": {
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-left-color": {
                value: 'transparent',
                bind: null
            },

            "border-left-width": {
                value: '0px',
                bind: null
            },

            "border-left-style": {
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-right-color": {
                value: 'transparent',
                bind: null
            },

            "border-right-width": {
                value: '0px',
                bind: null
            },

            "border-right-style": {
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },


        };

        var linkProperties = angular.copy(textProperties);
        linkProperties.href = {
            value: null,
            bind: null
        };
        var buttonProperties = angular.copy(textProperties);
        var blockProperties = angular.copy(textProperties);
        delete blockProperties.text;
        blockProperties.display.value = 'block';

        var imageProperties = angular.copy(textProperties);
        delete imageProperties.text;
        imageProperties.src = {
            value: 'src/media/default.png',
            bind: null
        };







        var basicEvents = {
            click: {
                label: null,
                method: 'ng-click',
                fn: []
            },
            "Init": {
                label: null,
                method: 'ng-init',
                fn: []
            },
            "Mouse down": {
                label: null,
                method: 'ng-mousedown',
                fn: []
            },
            "Mouse move": {
                label: null,
                method: 'ng-mousemove',
                fn: []
            }
        };


        return {
            block: {
                label: 'Block',
                properties: blockProperties,
                events: basicEvents
            },

            text: {
                label: 'Text',
                properties: textProperties,
                events: basicEvents
            },

            link: {
                label: 'Link',
                properties: linkProperties,
                events: basicEvents
            },

            image: {
                label: 'Image',
                properties: imageProperties,
                events: basicEvents
            },

            button: {
                label: 'Button',
                properties: buttonProperties,
                events: basicEvents
            },

            repeat: {
                label: 'Repeat',
                properties: {
                    template: {
                        value: null,
                        bind: null
                    },
                    repeat: {
                        value: null,
                        bind: null
                    }
                },
                events: basicEvents
            }
        };
    }

    angular.module('app')
        .service('OrbiterElementTypes', OrbiterElementTypes);
})();
