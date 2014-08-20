
var express     = require('express'),
    https       = require('https'),
    passport    = require('passport'),
    hbs         = require('hbs'),
    path        = require('path'),
    fs          = require('fs'),
    flash       = require('connect-flash'),
    MongoStore  = require('connect-mongo')(express),
    mongoose    = require('mongoose'),
    util        = require('util'),
    request     = require('request'),
    app         = express();

app.configure('development', function(){
    app.set("dbURL","mongodb://localhost:27017/node-mongo-ex");
    app.set('host', 'http://localhost:8080')
});

app.configure('production', function(){
    app.set('host', 'http://ec2-54-200-74-201.us-west-2.compute.amazonaws.com');
    app.set("dbURL",process.env.MONGOHQ_URL);
});


app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/server/templates');
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('H3R0'));

    app.use(express.session(
        { secret: 'H3R0',
            store: new MongoStore({
                db : "HappyRobot",
                url : app.get("dbURL")
            })
        }
     ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(app.router);


});


/*----Routes----*/
/* server side routes */

/* client side routes -  just catch everything and let the backbone router take care of it*/
app.get('/*', /*auth(false),*/ function (req, res) {
    var name = (req.user && req.user.name) ? req.user.name : "dork";
    res.render('index', {layout:false, name:name});
});

app.post('/authenticate',
    passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login',failureFlash: true })
);


function authv(ajax){
    return function(req, res, next){
        if (!req.user){
            ajax ? res.send(401) : res.redirect("/login");
        }
        else {
            next();
        }
    }
}

//connect to the db.
/*mongoose.connect(app.get("dbURL"), function(err){
    if (err){
        throw err;
    }
    else {
        console.log("Successfully connected to Mongo db")
    }
});*/

app.listen(app.get('port'), function(){
    console.log("Happy Robot server listening on port " + app.get('port'));
});


