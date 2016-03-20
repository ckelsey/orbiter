(function () {
    'use strict';

    function OrbiterElementsService($localStorage, InteractiveService, OrbiterElementTypes){
        var self = {
            htmlTreeView: false,
            elementClipboard: null,

            deleteElement: function(el){
                var id = el.id;
                self.findInHtmlTree(id, 'delete');
                InteractiveService.elementProperties = null;
                delete InteractiveService.elements[id];
            },

            copyElement: function(el){
                var elData = self.findInHtmlTree(el.id);
                if(elData){
                    self.elementClipboard = self.aggregateElementData(elData.element);
                }
            },

            pasteElement: function(el){
                var paste = function(obj, parent){
                    var node = self.giveUniqueId(obj);
                    var children = node.nodes;
                    delete node.nodes;
                    var nodeIndex = parent.nodes.length;
                    parent.nodes.push({
                        id: node.id,
                        nodes: []
                    });
                    InteractiveService.elements[node.id] = node;
                    for(var n=0;n<children.length;n++){
                        paste(children[n], parent.nodes[nodeIndex]);
                    }
                };



                var elData = self.findInHtmlTree(el.id);
                if(self.elementClipboard && elData){
                    paste(self.elementClipboard, elData.element);
                }
            },

            moveElementUp: function(el){
                var elData = self.findInHtmlTree(el.id);
                var newIndex = elData.index ? elData.index - 1 : elData.index;
                elData.parent.nodes.splice(newIndex, 0, elData.parent.nodes.splice(elData.index, 1)[0]);
            },

            moveElementDown: function(el){
                var elData = self.findInHtmlTree(el.id);
                var newIndex = elData.index + 1;
                elData.parent.nodes.splice(newIndex, 0, elData.parent.nodes.splice(elData.index, 1)[0]);
            },

            findInHtmlTree: function(id, action){
                function findElement(obj){
                    for(var n=0;n<obj.nodes.length;n++){
                        if (obj.nodes[n].id === id){
                            if(action === 'delete'){
                                obj.nodes.splice(n, 1);
                                return InteractiveService.htmlTree;
                            }else{
                                return {parent: obj, index: n, element: obj.nodes[n]};
                            }
                        }

                        if(obj.nodes[n].nodes.length > 0){
                            return findElement(obj.nodes[n]);
                        }
                    }
                }

                return findElement(InteractiveService.htmlTree);
            },

            giveUniqueId: function(node){
                node = angular.copy(node);
                var tempNumber = 1;
                node.id = node.id || node.label;
                node.tempId = node.id;
                var oldID = node.id;
                if(InteractiveService.elements.hasOwnProperty(node.id)){
                    while(InteractiveService.elements.hasOwnProperty(node.id +' '+ tempNumber)){
                        tempNumber++;
                    }
                    node.id = node.id +' '+ tempNumber;
                    node.tempId = node.id;
                }

                if(node.id !== oldID){
                    for(var p in node.properties){
                        if(node.properties[p].bind){
                            var bind = node.properties[p].bind.split('.');
                            if(bind[1] === oldID){
                                bind[1] = node.id;
                                node.properties[p].bind = bind.join('.');
                            }
                        }
                    }
                }

                return node;
            },

            aggregateElementData: function(obj){
                var newObject = angular.copy(InteractiveService.elements[obj.id]);
                newObject.nodes = angular.copy(obj.nodes);
                for(var n=0;n<newObject.nodes.length;n++){
                    newObject.nodes[n] = self.aggregateElementData(newObject.nodes[n]);
                }
                return newObject;
            },

            addToInteractive: function(parent, data){
                var node = self.giveUniqueId(data);
                node.created = new Date().getTime();
                node.orbiterType = 'element';

                for(var p in node.properties){
                    node.properties[p].bind = node.properties[p].bind ? node.properties[p].bind : 'elements.'+ node.id +'.properties.'+ p;
                }

                if(parent.id !== node.id){
                    parent.nodes.push({
                        id: node.id,
                        nodes: []
                    });

                    delete node.nodes;
                    InteractiveService.elements[node.id] = node;
                    self.activeProperties(InteractiveService.elements[node.id]);
                    return parent.nodes[parent.nodes.length-1];
                }
                return false;
            },

            stagedElementIdConflict: null,
            updateElementId: function(data){
                var originalID = data.id;
                var newId = data.tempId;
                function reset() {
                    for(var key in InteractiveService.elements){
                        if(InteractiveService.elements[key].id === data.id){
                            InteractiveService.elements[key].id = key;
                            break;
                        }
                    }
                }

                function updateElement(obj){
                    for(var n=0;n<obj.nodes.length;n++){
                        if (obj.nodes[n].id === originalID){
                            obj.nodes[n].id = newId;
                        }

                        if(obj.nodes[n].nodes.length > 0){
                            updateElement(obj.nodes[n]);
                        }
                    }
                }

                if(!newId){
                    self.stagedElementIdConflict = "Element name is required";
                    reset();
                }else if(newId.indexOf('.') > -1){
                    self.stagedElementIdConflict = "Element name cannont contain periods(.)";
                    reset();
                }else if(InteractiveService.elements.hasOwnProperty(newId) && data.created !== InteractiveService.elements[newId].created){
                    self.stagedElementIdConflict = "There is already an element with this name";
                    reset();
                }else{
                    self.stagedElementIdConflict = null;
                    for(var prop in data.properties){
                        var bind = data.properties[prop].bind.split('.');
                        if(bind[1] === data.id){
                            bind[1] = newId;
                            data.properties[prop].bind = bind.join('.');
                        }
                    }

                    InteractiveService.elements[newId] = angular.copy(data);
                    InteractiveService.elements[newId].id = newId;
                    delete InteractiveService.elements[originalID];
                    updateElement(InteractiveService.htmlTree);
                    self.activeProperties(InteractiveService.elements[newId]);
                }
            },

            activeProperties: function(data){
                if(InteractiveService.elementProperties){
                    InteractiveService.elementProperties.active = false;
                }
                data.active = true;
                InteractiveService.elementProperties = data;
            }
        };

        return self;
    }

    angular.module('app').service('OrbiterElementsService', OrbiterElementsService);
})();
