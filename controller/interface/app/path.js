
var connectEnsureLogin = require('connect-ensure-login');
var properties = require('../../properties.js');
var public = require('../public.js');
var user = require('../user.js');


exports.delete = function(router) {
  console.log('app.path.delete()');
};

exports.get = function(router, passport) {
  console.log('app.path.get()');
  router.get("/", public.getIndex);
};

exports.post = function(router, passport) {
  console.log('app.path.post()');
};
