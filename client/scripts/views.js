 define(function (require) {
var Backbone    = require('backbone'),
    Handlebars  = require('handlebars'),
    Templates   = require('Templates'),
    models      = require('models');


 var BaseView = Backbone.View.extend({
     containerSelector :  '#content',
    /**
        *   The data to render into the template
        *   @override - subclasses  override
        */
     templateData : null,
     /**
      *   The template name
      *   @override - subclasses  override
      */
     templateName : null,
     initialize: function () {
         this.$container = $(this.containerSelector);
         if (this.$container.length === 0) return new Error('No container element found');
     },
     render : function () {
         var html = (this.templateData) ? this.getTemplate(this.templateData) : this.getTemplate();
         this.$el.html(html);
         this.$container.html(this.$el);
     },
     getTemplate : function (data) {
         if (!Templates[this.templateName]) throw new Error('No template found for:'+ this.templateName);
         return Templates[this.templateName](data);
     }
 });

 var MessageView = BaseView.extend({
     containerSelector :  '#message-container',
     className: "message",
     templateName :  'message',
     initialize: function () {
         BaseView.prototype.initialize.call(this)
     },
     displayMessage : function (msg) {
         this.templateData = {message:msg};
         this.render();
     }
 });


var IndexView = BaseView.extend({
    className: "main",
    templateName :  'index',
    initialize: function () {
        this.templateData = {data: 'data'};
        BaseView.prototype.initialize.call(this)
    }
});
 var SettingsView = BaseView.extend({
     className: "settings",
     templateName :  'settings',
     initialize: function () {
         this.templateData = {data: 'data'};
         BaseView.prototype.initialize.call(this)
     }
 });

 var SignUpView = BaseView.extend({
     containerSelector :  '#content',
     templateName :  'sign-up',
     className: "sign-up",
     events : {
         'click #userSubmit' : 'submitUserInfo'
     },
     submitUserInfo : function () {
         //add validation of course
         var User = models.User;
         var user = new User({
             firstName : $("#firstName").val(),
             lastName : $("#lastName").val(),
             email : $("#email").val(),
             password : $("#password").val(),
             passwordConfirm : $("#passwordConfirm").val()
         });
         user.on('sync', function (model, response, options){
             var attrs = model.attributes;
             var prev = model._previousAttributes
             delete attrs.password;
             delete prev.password;
             delete attrs.passwordConfirm;
             delete prev.passwordConfirm;
         });
         user.on('error', function (model, response, options){
             console.log("failure")
         });
         user.save();

     }
 });

     return {
         IndexView : IndexView,
         SignUpView : SignUpView,
         SettingsView : SettingsView
     }
})//end define