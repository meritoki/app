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
        usernameField: 'name',
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
                return done(error,null);
            }
            var user = null;
            try {
              user = JSON.parse(body);
            } catch (e) {
                console.log(e);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log('authentication.serializeUser');
    // user = JSON.parse(user);
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('authentication.deserializeUser');
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": "http://localhost:3000/v1/auth/name",
      "body": JSON.stringify({
          "name": user.name
      })
    }, (error, response, body) => {
        if(error) {
            return done (error, null);
        }
        var user = null;
        try {
          user = JSON.parse(body);
        } catch (e) {
            console.log(e);
        }
        return done(null, user);
        //return done(null, JSON.stringify(body));
    });

    // relational.getNameUser(user.name, function (err, user) {
    //     done(err, user);
    // });
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
            var user = null;
            try {
              user = JSON.parse(body);
            } catch (e) {
                console.log(e);
            }
            return done(null, user);
        });
    }
));

passport.use(new passportOauth2ClientPasswordStrategy(
    function (identification, secret, done) {
        console.log('authentication.passportOauth2ClientPasswordStrategy ' + identification);
        Request.post({
          "headers": { "content-type": "application/json" },
          "url": "http://localhost:3000/v1/auth/client",
          "body": JSON.stringify({
              "identification": identification
          })
        }, (error, response, body) => {
            if (error) {
                return done(err);
            }
            var client = null;
            try {
              client = JSON.parse(body);
            } catch (e) {
                console.log(e);
            }
            console.log(client);
            console.log(client.secret+ " "+secret);
            if (!client) {
                return done(null, false);
            }
            if (client.secret != secret) {
                return done(null, false);
            }
            // console.log(client);
            return done(null, JSON.stringify(client));
        });
    }
));

passport.use(new passportHTTPBearerStrategy(
    function (token, done) {
        console.log('authentication.passportHTTPBearerStrategy ' + token);
        Request.post({
          "headers": { "content-type": "application/json" },
          "url": "http://localhost:3000/v1/auth/token",
          "body": JSON.stringify({
              "key": key
          })
        }, (error, response, token) => {
            if(error) {
                return done (error, null);
            }
            if (!token) {
                return done(null, false);
            }
            Request.post({
              "headers": { "content-type": "application/json" },
              "url": "http://localhost:3000/v1/auth/id",
              "body": JSON.stringify({
                  "id": token.idUser
              })
            }, (error, response, user) => {
                if(error) {
                    return done(error, null);
                }
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                var info = {
                    scope: '*'
                }
                done(null, user, info);
            });
        });
        // rel
        // relational.getToken(token, function (err, token) {
        //     if (err) {
        //         return done(err);
        //     }
        //     if (!token) {
        //         return done(null, false);
        //     }
        //     relational.getIDUser(token.idUser, function (err, user) {
        //         if (err) {
        //             return done(err);
        //         }
        //         if (!user) {
        //             return done(null, false);
        //         }
        //         var info = {
        //             scope: '*'
        //         }
        //         done(null, user, info);
        //     });
        // });
    }
));
