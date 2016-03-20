(function () {
    'use strict';

    function OrbiterPropertyService($localStorage, InteractiveService, InteractiveProperties){
        var equalObjects = function(obj1, obj2){
            if(obj1 === obj2){
                return true;
            }
            if(!obj1 || !obj2){
                return false;
            }

            if(Array.isArray(obj1) && Array.isArray(obj2)){
                if(obj1.length !== obj2.length){
                    return false;
                }
                for(var i=0;i<obj1.length;i++){
                    if(obj1[i] !== obj2[i]){
                        return false;
                    }
                }
                return true;
            }
            var keys1 = Object.keys(obj1);
            var keys2 = Object.keys(obj2);

            if(keys1.length !== keys2.length){
                return false;
            }
            for(var i=0;i<keys1.length;i++){
                if(keys1[i] !== keys2[i]){
                    return false;
                }
            }
            var json1 = JSON.stringify(obj1);
            var json2 = JSON.stringify(obj2);
            if(json1 !== json2){
                return false;
            }
            return true;
        }

        var self = {
            stagedProperty: null,
            stagedPropertyErrors: false,
            buildObject: function(obj, parent){
                obj.errors = {key:null, type:null};
                if(!obj.key && parent && parent.type !== 'array'){
                    self.stagedPropertyErrors = true;
                    obj.errors.key = "Property name is required";
                }

                if(!obj.type){
                    self.stagedPropertyErrors = true;
                    obj.errors.type = "Data type is required";
                    return null;
                }else if(obj.type === 'text' || obj.type === 'number'){
                    return obj.defaultValue;
                }else if(obj.type === 'object'){
                    var temp = {};
                    if(obj.defaultValue){
                        for(var p=0;p<obj.defaultValue.length;p++){
                            temp[obj.defaultValue[p].key] = self.buildObject(obj.defaultValue[p], obj);
                        }
                    }
                    return temp;
                }else if(obj.type === 'array'){
                    var temp = [];
                    if(obj.defaultValue){
                        for(var p=0;p<obj.defaultValue.length;p++){
                            temp.push(self.buildObject(obj.defaultValue[p], obj));
                        }
                    }
                    return temp;
                }else {
                    return null;
                }
            },

            insertNewProperty: function(data){
                data.errors = {key:null, type:null};
                self.stagedPropertyErrors = false;
                if(!data.key && data.type !== 'array'){
                    self.stagedPropertyErrors = true;
                    data.errors.key = "Property name is required";
                }else if((InteractiveService.properties.hasOwnProperty(data.key) && !data.hasOwnProperty('originalKey')) || (InteractiveService.properties.hasOwnProperty(data.key) && data.hasOwnProperty('originalKey') && data.key !== data.originalKey)){
                    self.stagedPropertyErrors = true;
                    data.errors.key = "There is already a property with this name";
                }

                if(!data.type){
                    self.stagedPropertyErrors = true;
                    data.errors.type = "Data type is required";
                }

                if(data.type === 'object' || data.type === 'array'){
                    data.value = self.buildObject(data);
                }else{
                    data.value = data.defaultValue;
                }

                if(!self.stagedPropertyErrors){
                    if(data.hasOwnProperty('originalKey')){
                        delete data.originalKey;
                    }

                    data.orbiterType = 'property';
                    InteractiveService.properties[data.key] = data;
                    self.stagedProperty = null;
                }
            },

            editProperty: function(data){
                self.stagedProperty = angular.copy(data);
                self.stagedProperty.originalKey = angular.copy(data.key);
            },

            deleteProperty: function(parent, index){
                if(parent.hasOwnProperty('defaultValue') && parent.defaultValue[index] !== undefined){
                    parent = parent.defaultValue;
                }
                if(parent && index !== undefined){
                    if(Array.isArray(parent)){
                        parent.splice(index, 1);
                    }else{
                        delete parent[index];
                    }

                    if(equalObjects(parent, InteractiveService.properties)){
                        self.stagedProperty = null;
                        self.propertyDialogue = true;
                    }
                }
            },

            addProperty: function(property){
                if(property.type === 'object' || property.type === 'array'){
                    if(!property.defaultValue || typeof property.defaultValue !== 'object'){
                        property.defaultValue = [];
                    }

                    property.defaultValue.push({
                        key: null,
                        type: null,
                        defaultValue: null,
                        value: null
                    });
                }
            },

            buildProperty: function(property){
                if(property.type === 'object' || property.type === 'array'){
                    property.value = self.buildObject(property);
                }else{
                    property.value = property.defaultValue;
                }

                if(property.hasOwnProperty('originalKey')){
                    delete property.originalKey;
                }

                InteractiveService.properties[property.key] = property;
            }
        };



        return self;
    }

    angular.module('app').service('OrbiterPropertyService', OrbiterPropertyService);
})();
