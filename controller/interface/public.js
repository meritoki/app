/*
 * Name: public.js
 * Author: Joaquin Rodriguez
 * Date: 201511
 */
var properties = require('../properties.js');
var passport = require('passport');


var menu = {
  'REGISTER': '/register',
  'LOGIN': '/login'
};

var getMenu = function(role) {
  var m = {};
  m = {
    'REGISTER': '/register',
    'LOGIN': '/login'
  }
  return m;
};

//GET///////////////////////////////////////////////////////////////////////////////////////////////////
exports.getIndex = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('index', {
    menu: menu
  });
}

exports.getLogin = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/login', {
    menu: menu,
    action: '/login',
  })
}

exports.getLoginFailure = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/login', {
    action: '/login',
    menu: menu,
    message: 'Please check your username or password and try again'
  });
}

exports.getLogout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
  })
  req.logout();
  res.redirect('/');
}

exports.getNotAuthorized = function(req, res, next) {
  var user = req.user;
  var role = user.role;
  var menu = getMenu(role);
  res.render('account/not-authorized', {
    menu: menu
  });
};


//POST//////////////////////////////////////////////////////////////////////////////////////////////////
exports.postLogin = passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login/failure'
});
