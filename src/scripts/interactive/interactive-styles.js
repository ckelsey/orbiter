/*
- outline
- cursor
- break up box-shadow and have color picker. Maybe break up each into an array [[hor, ver, radius, width, color], [hor, ver, radius, width, color]]
- text-shadow
- display table
- floats and clear
- list styles
*/
(function () {
    'use strict';
    function InteractiveStyles(){
        return {
            display:{
                ruleName: 'display',
                category: 'display'
            },
            "background-color":{
                ruleName: 'background-color',
                category: 'display'
            },
            "border-radius":{
                ruleName: "border-radius",
                category: 'display'
            },
            "box-shadow":{
                ruleName: "box-shadow",
                category: 'display'
            },
            "overflow":{
                ruleName: "overflow",
                category: 'display'
            },
            "cursor":{
                ruleName: "cursor",
                category: 'display'
            },
            "vertical-align":{
                ruleName: "vertical-align",
                category: 'display'
            },
            "outline":{
                ruleName: "outline",
                category: 'display'
            },
            "z-index":{
                ruleName: "z-index",
                category: 'display'
            },
            "transition":{
                ruleName: "transition",
                category: 'display'
            },



            "width":{
                ruleName: "width",
                category: 'dimensions'
            },
            "max-width":{
                ruleName: "max-width",
                category: 'dimensions'
            },
            "min-width":{
                ruleName: "min-width",
                category: 'dimensions'
            },
            "height":{
                ruleName: "height",
                category: 'dimensions'
            },
            "max-height":{
                ruleName: "max-height",
                category: 'dimensions'
            },
            "min-height":{
                ruleName: "min-height",
                category: 'dimensions'
            },



            "position":{
                ruleName: "position",
                category: 'position'
            },
            "top":{
                ruleName: "top",
                category: 'position'
            },
            "bottom":{
                ruleName: "bottom",
                category: 'position'
            },
            "left":{
                ruleName: "left",
                category: 'position'
            },
            "right":{
                ruleName: "right",
                category: 'position'
            },
            "transform":{
                ruleName: "transform",
                category: 'position'
            },



            color:{
                ruleName: 'color',
                category: 'text'
            },
            "font-size":{
                ruleName: "font-size",
                category: 'text'
            },
            size: {
                ruleName: "font-size",
                category: 'text'
            },
            "font-weight": {
                ruleName: "font-weight",
                category: 'text'
            },
            weight: {
                ruleName: "font-weight",
                category: 'text'
            },
            "text-align": {
                ruleName: "text-align",
                category: 'text'
            },
            align: {
                ruleName: "text-align",
                category: 'text'
            },
            "font-style": {
                ruleName: "font-style",
                category: 'text'
            },
            "text-decoration": {
                ruleName: "text-decoration",
                category: 'text'
            },
            "line-height": {
                ruleName: "line-height",
                category: "text"
            },




            "padding-top": {
                ruleName: "padding-top",
                category: 'spacing'
            },
            "padding-right": {
                ruleName: "padding-right",
                category: 'spacing'
            },
            "padding-bottom": {
                ruleName: "padding-bottom",
                category: 'spacing'
            },
            "padding-left": {
                ruleName: "padding-left",
                category: 'spacing'
            },
            "margin-top": {
                ruleName: "margin-top",
                category: 'spacing'
            },
            "margin-right": {
                ruleName: "margin-right",
                category: 'spacing'
            },
            "margin-bottom": {
                ruleName: "margin-bottom",
                category: 'spacing'
            },
            "margin-left": {
                ruleName: "margin-left",
                category: 'spacing'
            },
            "border-top-color":{
                ruleName: "border-top-color",
                category: 'border'
            },
            "border-top-width":{
                ruleName: "border-top-width",
                category: 'border'
            },
            "border-top-style":{
                ruleName: "border-top-style",
                category: 'border'
            },
            "border-bottom-color":{
                ruleName: "border-bottom-color",
                category: 'border'
            },
            "border-bottom-width":{
                ruleName: "border-bottom-width",
                category: 'border'
            },
            "border-bottom-style":{
                ruleName: "border-bottom-style",
                category: 'border'
            },
            "border-left-color":{
                ruleName: "border-left-color",
                category: 'border'
            },
            "border-left-width":{
                ruleName: "border-left-width",
                category: 'border'
            },
            "border-left-style":{
                ruleName: "border-left-style",
                category: 'border'
            },
            "border-right-color":{
                ruleName: "border-right-color",
                category: 'border'
            },
            "border-right-width":{
                ruleName: "border-right-width",
                category: 'border'
            },
            "border-right-style":{
                ruleName: "border-right-style",
                category: 'border'
            },



        };
    }

    angular.module('app')
    .service('InteractiveStyles', InteractiveStyles);
})();
