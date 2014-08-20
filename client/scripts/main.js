require.config({
    baseUrl: "./scripts/js/",
    //shim is used for libs that don't use amd module style
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        handlebars : {
            exports : 'Handlebars'
        },
        jquery : {
            exports : '$'
        }
    },

    paths: {
        jquery: "../../bower_components/jquery/dist/jquery",
        underscore: "../../bower_components/underscore/underscore",
        backbone: "../../bower_components/backbone/backbone",
        handlebars: "../../bower_components/handlebars/handlebars",
        Templates :'../../public/js/templates'
    }
});


define(function (require){
    var app = require('app');
    var $ = require('jquery');
    $(document).ready(function ($) {
        app.init();
    });
});