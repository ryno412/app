define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>index template</h1>\n<p>i is some ";
  if (stack1 = helpers.data) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.data); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  return buffer;
  });

this["templates"]["message"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p>a message: ";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  });

this["templates"]["settings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Some Settings</h1>";
  });

this["templates"]["sign-up"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"user-registration-form\" action=\"/registerUser\" method=\"POST\">\n    <input id=\"firstName\" class='inputFields' placeholder=\"First Name\" type=text name=\"firstName\">\n    <input id=\"lastName\" class='inputFields' placeholder=\"Last Name\" type=text name=\"lastName\">\n    <input id=\"email\" class='inputFields' placeholder=\"email\" type=text name=\"email\">\n    <input id=\"password\" class='inputFields' placeholder=\"password\" type=\"password\" name=\"password\">\n    <input id=\"passwordConfirm\" class='inputFields' placeholder=\"confirm password\" type=\"password\" name=\"passwordConfirm\">\n    <!-- <label for=\"msg\" class='inputFields' >Enter a Message</label>-->\n    <input id=\"userSubmit\" class='inputFields' type=\"button\" value=\"Submit\">\n</form>\n<div id=\"error-msg\"></div";
  });

return this["templates"];

});