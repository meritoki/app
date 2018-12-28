/*
 * Name: authentication.js
 * Author: Joaquin Rodriguez
 * Date: 201511
 */
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHTTP = require('passport-http');
var passportOauth2ClientPassword = require('passport-oauth2-client-password');
var passportHTTPBearer = require('passport-http-bearer');
var passportLocalStrategy = passportLocal.Strategy;
var passportHTTPBasicStrategy = passportHTTP.BasicStrategy;
var passportOauth2ClientPasswordStrategy = passportOauth2ClientPassword.Strategy;
var passportHTTPBearerStrategy = passportHTTPBearer.Strategy;
var Request = require("request");

passport.use('local', new passportLocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    function (name, password, done) {
        console.log('authentication.passportLocalStrategy');
        Request.post({
          "headers": { "content-type": "application/json" },
          "url": "http://localhost:3000/v1/auth/name/password",
          "body": JSON.stringify({
              "name": name,
              "password":password
          })
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            return done(null, body);
        });
        // relational.getNamePasswordUser(name, password, function (err, u) {
        //     return done(err, u);
        // });
    }
));

passport.serializeUser(function (user, done) {
    console.log('authentication.serializeUser');
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('authentication.deserializeUser');
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": "http://localhost:3000/auth/name",
      "body": JSON.stringify({
          "name": user.name
      })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        return done(null, body);
    });
});

passport.use(new passportHTTPBasicStrategy(
    function (name, password, done) {
        console.log('authentication.passportHTTPBasicStrategy ' + name);
        Request.post({
          "headers": { "content-type": "application/json" },
          "url": "http://localhost:3000/v1/auth/name/password",
          "body": JSON.stringify({
              "name": name,
              "password":password
          })
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            return done(null, body);
        });
    }
));
