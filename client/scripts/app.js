define(function (require){
    var router = require('router');
    return {
        init : function () {
            this.router = new router();
            Backbone.history || (Backbone.history = new Backbone.History());
            Backbone.history.start({
                pushState: true,
                root: '/'
            });
            this.router.initLinkHandler();
        }
    }
});