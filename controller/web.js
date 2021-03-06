/*
 * Name: web.js
 * Author: Joaquin Rodriguez
 * Copyright: 2018 Meritoki
 * Date: 2018/07
 * Reference: http://www.clock.co.uk/blog/a-simple-website-in-nodejs-with-express-jade-and-stylus
 * Reference: https://www.codementor.io/nodejs/tutorial/build-website-from-scratch-using-expressjs-and-bootstrap
 * Reference: http://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
 * Reference: http://passportjs.org/docs
 * Reference: http://stackoverflow.com/questions/27961320/when-should-i-use-cookie-parser-with-express-session
 */
var express = require('express');
var oauth2orize = require('oauth2orize');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var properties = require('./properties.js');
var header = require('./interface/header.js');
var protocol = require('./interface/protocol.js');
var appPath = require('./interface/app/path.js');
var security = require('./interface/security.js');
var web = express();
var router = express.Router();
var view = __dirname + '/../view';
var model = __dirname + '/../model';
var passport = require('passport');
var oauth2orize = require('oauth2orize');
var oauth2orizeServer = oauth2orize.createServer();
var connectEnsureLogin = require('connect-ensure-login');
var redis = require("redis");
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();

console.log(properties.name);
console.log("version "+properties.version);
security.log(web);
web.set('views', view);
web.set('view engine', 'jade');
web.use(express.static(view + '/public'));
web.use('/media', express.static(model + '/media'));
web.use(bodyParser.json({
  limit: '50mb'
}))
web.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));
// web.use(cookieParser(properties.cookie.secret));
web.use(session({
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: properties.session.maxAge
  },
  secret: properties.session.secret,
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}));
web.use('/media', connectEnsureLogin.ensureLoggedIn());
web.use(function(req, res, next){header.initialize(req, res, next)});
web.use(passport.initialize());
web.use(passport.session());
web.use("/", router);
require('./interface/authentication.js');

appPath.delete(router);
appPath.get(router,passport);
appPath.post(router,passport);
protocol.initialize(web,router);
