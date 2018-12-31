
var connectEnsureLogin = require('connect-ensure-login');
var properties = require('../../properties.js');
var public = require('../public.js');
var user = require('../user.js');


exports.delete = function(router) {
  console.log('app.path.delete()');
};

exports.get = function(router, passport) {
  //authentifcation
  console.log('app.path.get()');
  router.get("/", public.getIndex);
  router.get("/account", connectEnsureLogin.ensureLoggedIn(), user.getAccount);
  router.get("/login", public.getLogin);
  router.get("/login/failure", public.getLoginFailure);
  router.get("/logout", public.getLogout);
  router.get("/not-authorized", connectEnsureLogin.ensureLoggedIn(), public.getNotAuthorized);
  //registration
  // router.get("/register", public.getRegister);
  // router.get("/register/id", public.getRegisterID);
  // router.get("/register/location", public.getRegisterLocation);
};

exports.post = function(router, passport) {
  console.log('app.path.post()');
  router.post("/login", public.postLogin);
};
