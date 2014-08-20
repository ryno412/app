define(function (require){
var User = Backbone.Model.extend({
    initialize : function (){

    },
    validate : function (attrs, options) {
        console.log("$$$$$$$$$$$");
        console.log(attrs)
        console.log(options)
    },
    url : '/registerUser',
    firstName : null,
    lastName : null,
    email : null

});

return {
    User : User
};


});//end define
