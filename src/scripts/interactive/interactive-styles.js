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
                transform: {
                    inline: 'inline-block'
                }
            },
            color:{
                ruleName: 'color'
            },
            "background-color":{
                ruleName: 'background-color'
            },
            "font-size":{
                ruleName: "font-size"
            },
            size: {
                ruleName: "font-size"
            },
            "font-weight": {
                ruleName: "font-weight"
            },
            weight: {
                ruleName: "font-weight"
            },
            "text-align": {
                ruleName: "text-align"
            },
            align: {
                ruleName: "text-align"
            },
            "font-style": {
                ruleName: "font-style"
            },
            "text-decoration": {
                ruleName: "text-decoration"
            },
            "padding-top": {
                ruleName: "padding-top"
            },
            "padding-right": {
                ruleName: "padding-right"
            },
            "padding-bottom": {
                ruleName: "padding-bottom"
            },
            "padding-left": {
                ruleName: "padding-left"
            },
            "margin-top": {
                ruleName: "margin-top"
            },
            "margin-right": {
                ruleName: "margin-right"
            },
            "margin-bottom": {
                ruleName: "margin-bottom"
            },
            "margin-left": {
                ruleName: "margin-left"
            },
            "border-top-color":{
                ruleName: "border-top-color"
            },
            "border-top-width":{
                ruleName: "border-top-width"
            },
            "border-top-style":{
                ruleName: "border-top-style"
            },
            "border-bottom-color":{
                ruleName: "border-bottom-color"
            },
            "border-bottom-width":{
                ruleName: "border-bottom-width"
            },
            "border-bottom-style":{
                ruleName: "border-bottom-style"
            },
            "border-left-color":{
                ruleName: "border-left-color"
            },
            "border-left-width":{
                ruleName: "border-left-width"
            },
            "border-left-style":{
                ruleName: "border-left-style"
            },
            "border-right-color":{
                ruleName: "border-right-color"
            },
            "border-right-width":{
                ruleName: "border-right-width"
            },
            "border-right-style":{
                ruleName: "border-right-style"
            },
            "border-radius":{
                ruleName: "border-radius"
            },
            "box-shadow":{
                ruleName: "box-shadow"
            }
        };
    }

    angular.module('app')
    .service('InteractiveStyles', InteractiveStyles);
})();
