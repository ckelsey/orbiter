(function () {
    'use strict';

    function InteractiveService(){
        var self = {
            htmlTree: {
                nodes:[
                    {
                        id: '_root_',
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
            }
        };
        return self;
    }

    angular.module('app').service('InteractiveService', InteractiveService);
})();
