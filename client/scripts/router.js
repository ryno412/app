define(function (require){
    var Backbone = require('backbone');
    var _ = require('underscore');
    var views = require('views');
    var $ = require('jquery');
    var AppRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "settings": "settings",
            "sign-up" :  "signup"
        },
        index: function(query, page) {
            this.setCurrentView('IndexView');
        },
        settings: function(query, page) {
            this.setCurrentView('SettingsView');
        },
        signup : function () {
            this.setCurrentView('SignUpView')
        },
        setCurrentView : function (viewName) {
            if (!views[viewName]) return new Error('view not found');
            var View = views[viewName];
            if (!(this.currentView instanceof View)) {
                if (this.currentView) this.currentView.remove();
                this.currentView = new View();
            }
            this.currentView.render();
            return this.currentView;
        },
        initLinkHandler : function (){
            $(document).on("click", "a:not([data-bypass])", function(e) {
                e.preventDefault();
                var href = { prop: $(this).prop("href"), attr: $(this).attr("href")};
                Backbone.history.navigate(href.attr, true);
            });
        }
    });

    return AppRouter;
});
