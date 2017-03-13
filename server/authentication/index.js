'use strict';
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require('lodash');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

var ENABLED_AUTH_STRATEGIES = [
    'local'
    // 'google'
];

module.exports = function (app) {

    // First, the session middleware will set/read sessions from the request.
    // The sessions will get stored in Mongo using the same connection from
    // mongoose. Check out the sessions collection in  MongoCLI.
    app.use(session({
        secret: process.env.NODE_ENV === "production" ? process.env.SESSION_SECRET : "Optimus Prime is my real dad", //app.getValue('env').SESSION_SECRET,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false
    }));

    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When a cookie is given to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // When  a cookie is received from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function (id, done) {
        UserModel.findById(id, done);
    });

    // A  simple GET /session is provided in order to get session information directly.
    // This is used by the browser application (Angular) to determine if a user is
    // logged in already.
    //
		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Unity-Version, X-Access-Token, X-Application-Name, X-Request-Sent-Time");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			next();
		});
    app.get('/session', function (req, res) {
        if (req.user) {
            res.send({ user: req.user.sanitize() });
        } else {
            res.status(401).send('No authenticated user.');
        }
    });

    // Simple /logout route.
    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });

    // Each strategy enabled gets registered.
    ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
        require(path.join(__dirname, strategyName))(app);
    });

};