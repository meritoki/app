/*
 * Name: public.js
 * Author: Joaquin Rodriguez
 * Date: 201511
 */
var properties = require('../properties.js');
var passport = require('passport');

var menu = {
  'HOME': '/',
  'LOGIN': '/login'
};

var getMenu = function(role) {
  var m = {};
  m = {
    'HOME': '/',
    'LOGIN': '/login'
  }
  return m;
};

//GET
exports.getLogin = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/login', {
    menu: menu,
    action: '/login',
    title: 'LOGIN'
  })
}

exports.getLoginFailure = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/login', {
    title: 'LOGIN FAILURE',
    action: '/login',
    menu: menu,
    message: 'Please check your username or password and try again'
  });
}

exports.getIndex = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('index', {
    title: 'HOME',
    menu: menu
  });
}


//POST
exports.getLogout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
  })
  req.logout();
  res.redirect('/');
}

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/login/failure'
});


exports.getNotAuthorized = function(req, res, next) {
  var user = req.user;
  var role = user.role;
  var menu = getMenu(role);
  res.render('account/not-authorized', {
    title: 'NOT AUTHORIZED',
    menu: menu
  });
};
