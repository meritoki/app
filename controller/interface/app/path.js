
var connectEnsureLogin = require('connect-ensure-login');
var properties = require('../../properties.js');
var public = require('../public.js');
var user = require('../user.js');
var msg = require('../msg.js');
var register = require('../register.js');



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
  router.get("/register", register.getIndex);
  router.get("/register/id", register.getID);

  router.get("/verify", msg.getVerify);
};

exports.post = function(router, passport) {
  console.log('app.path.post()');
  router.post("/login", public.postLogin);

  router.post("/register", register.postIndex);

  router.post("/verification",msg.postEmailVerification);
};
