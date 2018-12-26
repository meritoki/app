/**
 * Name: oauth2.js
 * Date: 2015-07-08
 */
 var Request = require("request");
var oauth2orize = require('oauth2orize'),
  passport = require('passport'),
  connectEnsureLogin = require('connect-ensure-login'),
  token = require('./token');

var server = oauth2orize.createServer();

server.serializeClient(function(client, done) {
  console.log('oauth2.serializeClient');
  return done(null, client.identification);
});

server.deserializeClient(function(identification, done) {
  console.log('oauth2.deserializeClient ' + identification);
  Request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://localhost:3000/v1/auth/client",
    "body": JSON.stringify({
        "identification": identification
    })
  }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      return done(null, body);
  });
});

// server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
//   var value = token.uid(16);
//   console.log('oauth2.grant'); // + code);
//   relational.setCode(value, client.idClient, user.idUser, redirectURI, function(err) {
//     done(err, value);
//   });
// }));
//
// server.exchange(oauth2orize.exchange.code(function(client, value, redirectURI, done) {
//   console.log('oauth2.exchange'); // + code);
//   relational.getCode(value, function(err, code) {
//     if (err) {
//       console.log(err);
//       return done(err);
//     }
//     if (code === undefined) {
//       return done(null, false);
//     }
//     if (client.idClient + '' !== code.idClient + '') {
//       return done(null, false);
//     }
//     if (redirectURI !== code.redirectURI) {
//       return done(null, false);
//     }
//     relational.removeCode(code.value, function(err) {
//       if (err) {
//         console.log(err);
//         return done(err);
//       }
//       var value = token.uid(256);
//       relational.setToken(value, code.idUser, code.idClient, function(err) {
//         if (err) {
//           return done(err);
//         } else {
//           return done(null, value);
//         }
//       });
//     });
//   });
// }));
//
// var getMenu = function() {
//   var m = {};
//   m = {
//     'HOME': '/',
//     'LOGIN': '/login'
//   }
//   return m;
// };
// var menu = getMenu();
//
// exports.authorization = [
//   connectEnsureLogin.ensureLoggedIn('/api/login'),
//   server.authorization(function(identification, redirectURI, done) {
//     console.log('oauth2.authorization ' + identification);
//     relational.getIdentificationClient(identification, function(err, client) {
//       if (err) {
//         console.log(err);
//         return done(err);
//       }else{
//       // WARNING: For security purposes, it is highly advisable to check that
//       //          redirectURI provided by the client matches one registered with
//       //          the server.  For simplicity, this example does not.  You have
//       //          been warned.
//         console.log('oauth2.authorization ' + identification+' '+JSON.stringify(client));
//         return done(null, client, redirectURI);
//       }
//     });
//   }),
//   function(req, res) {
//     menu = {
//       'HOME': '/',
//       'LOGOUT': '/logout'
//     }
//     res.render('public/dialog', {
//       transactionID: req.oauth2.transactionID,
//       title: "OAUTH2",
//       menu: menu,
//       user: req.user,
//       client: req.oauth2.client
//     });
//   }
// ]
//
// exports.decision = [
//   connectEnsureLogin.ensureLoggedIn(),
//   server.decision()
// ]
//
// exports.token = [
//   passport.authenticate(['basic', 'oauth2-client-password'], {
//     session: false
//   }),
//   server.token(),
//   server.errorHandler()
// ]
