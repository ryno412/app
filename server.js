var express         = require('express'),
    https           = require('https'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;
    hbs             = require('hbs'),
    path            = require('path'),
    fs              = require('fs'),
    flash           = require('connect-flash'),
    session         = require('express-session'),
    MongoStore      = require('connect-mongo')(session),
    mongoose        = require('mongoose'),
    util            = require('util'),
    request         = require('request'),
    cookieParser    = require('cookie-parser')
    bodyParser      = require('body-parser')
    favicon         = require('serve-favicon');
    router          = express.Router();
    serveStatic     = require('serve-static')
    env             = process.env.NODE_ENV || 'development';
    app             = express();

if (env === 'development') {
    app.set("dbURL","mongodb://localhost:27017/node-mongo-ex");
    app.set('host', 'http://localhost:8080')
}

if (env === 'production') {
    app.set('host', 'http://ec2-54-200-74-201.us-west-2.compute.amazonaws.com');
    app.set("dbURL",process.env.MONGOHQ_URL);
    //connect to the db.
    mongoose.connect(app.get("dbURL"), function(err){
        if (err){
            throw err;
        }
        else {
            console.log("Successfully connected to Mongo db")
        }
    });
}

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/server/templates');
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.use(serveStatic(__dirname + '/public', {'index': ['index.html', 'index.htm']}));
    app.use(bodyParser());
    app.use(cookieParser('H3R0'));

    app.use(session(
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

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
      function(username, password, done) {
      var user = {id:'ryno',name:'ryan'};
      return done(null,user);
/*        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });*/
      }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done) {
        done(null,{id:userId})
    });

/*----Routes----*/
/* server side routes */

/* client side routes -  just catch everything and let the backbone router take care of it*/
app.route('/login').get(function (req, res) {
    res.render('login')
})
app.route('/authenticate').post(
  passport.authenticate('local',
  { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);
app.route('/*').all(auth(false)).get(function (req, res) {
        var name = (req.user && req.user.id) ? req.user.id : "";
        res.render('index', {layout:false, name:name});
});

function auth(ajax){
    return function(req, res, next){
    console.log("user in auth",req.user)
        if (!req.user){
            ajax ? res.send(401) : res.redirect("/login");
        }
        else {
            next();
        }
    }
}



app.listen(app.get('port'), function(){
    console.log("Happy Robot server listening on port " + app.get('port'));
});


