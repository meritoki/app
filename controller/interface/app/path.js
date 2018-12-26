
var connectEnsureLogin = require('connect-ensure-login');
var properties = require('../../properties.js');
var public = require('../public.js');
var oauth2 = require('../oauth2.js');
var user = require('../user.js');


exports.delete = function(router) {
  console.log('app.path.delete()');
};

exports.get = function(router, passport) {
  console.log('app.path.get()');
  router.get("/", public.getIndex);
  router.get("/account", connectEnsureLogin.ensureLoggedIn(), user.getAccount);
  router.get("/login", public.getLogin);
  router.get("/login/failure", public.getLoginFailure);
  router.get("/logout", public.getLogout);
  router.get("/not-authorized", connectEnsureLogin.ensureLoggedIn(), user.getNotAuthorized);

  //router.get("/consumer", connectEnsureLogin.ensureLoggedIn(), organization.getIndex);
  //router.get("/consumer", connectEnsureLogin.ensureLoggedIn(), organization.getIndex);
  //router.get("/consumer", connectEnsureLogin.ensureLoggedIn(), organization.getIndex);
  //router.get("/consumer", connectEnsureLogin.ensureLoggedIn(), organization.getIndex);

  //router.get("/producer", connectEnsureLogin.ensureLoggedIn(), producer.getIndex);

  //router.get("/organization", connectEnsureLogin.ensureLoggedIn(), organization.getIndex);
  //router.get("/organization/leader", connectEnsureLogin.ensureLoggedIn(), organization.getLeader);
  //router.get("/organization/member", connectEnsureLogin.ensureLoggedIn(), organization.getMember);
  //router.get("/organization/viewer", connectEnsureLogin.ensureLoggedIn(), organization.getViewer);

};

exports.post = function(router, passport) {
  console.log('app.path.post()');
  router.post("/login", public.postLogin);
};
