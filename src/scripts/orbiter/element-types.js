(function () {
    'use strict';
    function OrbiterElementTypes(){
        var borderStyleOptions = ['dashed', 'dotted', 'double', 'groove', 'hidden', 'inherit', 'inset', 'none', 'outset', 'ridge', 'solid'];
        var textProperties = {
            text: {
                value: 'Text',
                bind: null
            },

            /* TEXT */
            color: {
                value: "inherit",
                bind: null
            },
            "font-size": {
                value: 'inherit',
                bind: null
            },
            "font-weight": {
                options: ['light', 'normal', 'bold', 'inherit'],
                value: 'inherit',
                bind: null
            },
            "font-style": {
                options: ['italic', 'normal', 'oblique', 'inherit'],
                value: 'inherit',
                bind: null
            },
            "text-decoration": {
                options: ['none', 'line-through', 'overline', 'underline', 'inherit'],
                value: 'inherit',
                bind: null
            },
            "text-align": {
                options: ['left', 'center', 'right', 'inherit'],
                value: 'inherit',
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
                value: 'transparent',
                bind: null
            },

            display: {
                options: ['block', 'inline'],
                value: 'inline',
                bind: null
            },

            "box-shadow":{
                value: 'none',
                bind: null
            },

            "border-radius":{
                value: '0px',
                bind: null
            },




            "border-top-color":{
                value: 'transparent',
                bind: null
            },

            "border-top-width":{
                value: '0px',
                bind: null
            },

            "border-top-style":{
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-bottom-color":{
                value: 'transparent',
                bind: null
            },

            "border-bottom-width":{
                value: '0px',
                bind: null
            },

            "border-bottom-style":{
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-left-color":{
                value: 'transparent',
                bind: null
            },

            "border-left-width":{
                value: '0px',
                bind: null
            },

            "border-left-style":{
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },

            "border-right-color":{
                value: 'transparent',
                bind: null
            },

            "border-right-width":{
                value: '0px',
                bind: null
            },

            "border-right-style":{
                value: 'none',
                options: borderStyleOptions,
                bind: null
            },


        };

        var linkProperties = angular.copy(textProperties);
        var buttonProperties = angular.copy(textProperties);
        var blockProperties = angular.copy(textProperties);
        blockProperties.display.value = 'block';







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
                properties: blockProperties,
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
