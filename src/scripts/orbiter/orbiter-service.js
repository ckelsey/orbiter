(function () {
    'use strict';

    function OrbiterService(InteractiveService){
        var self = {
            elements: {
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
                    properties: {
                        text: {
                            type:'text',
                            value: 'Text'
                        },
                        color: {
                            type:'color',
                            value: 'green'
                        },
                        size: {
                            type:'number',
                            value: '24'
                        },
                        weight: {
                            type: 'select',
                            options:['light', 'normal', 'bold'],
                            value: 'normal'
                        },
                        display: {
                            type: 'select',
                            options:['block', 'inline'],
                            value: 'inline'
                        },
                        align: {
                            type: 'select',
                            options:['left', 'center', 'right'],
                            value: 'left'
                        }
                    },
                    tag:{
                        block: 'p',
                        inline: 'span'
                    }
                },
                link:{
                    label: 'Link'
                },
                button:{
                    label: 'Button'
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
            },

            dragging: null,
            drag: function(data){
                self.dragging = data;
                InteractiveService.dragging = data;
            },

            addToInteractive: function(parent, data){
                parent.nodes.push(data)
                console.log(parent, data)
                //InteractiveService.htmlTree;
            }
        };
        return self;
    }

    angular.module('app').service('OrbiterService', OrbiterService);
})();
