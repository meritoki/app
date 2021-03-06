/*
 * Name: User.js
 * Date: 2015-07-08
 * Author: Joaquin Osvaldo Rodriguez
 */
var properties = require('../properties.js');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcryptjs');

var getMenu = function(role) {
  var m = {};
  if (role != undefined && role.indexOf(",") > -1) {
    m = getMenu(role.split(",")[0]);
  } else {
    if (('administrator').indexOf(role) > -1) {
      m = {
        'ACCOUNT': '/account',
        'LOGOUT': '/logout'
      }
    } else {
      m = {
        'HOME': '/account',
        'LOGIN': '/login'
      }
    }
  }
  return m;
};

/*
 * Function returns URL with FQDN for host, prefixed by secure http if applicable.
 */
var getURL = function() {
  var url = 'https://';
  if (!properties.https && !req.secure) {
    url = 'http://';
  }
  url = url + properties.host
  return url;
};


exports.getAccount = function(req, res, next) {
  console.log("user.getAccount");
  var user = req.user;
  var idUser = user.idUser;
  var role = user.role;
  var menu = getMenu(role);
  // if (isAuthorized(role, "consumer")) {
      res.render('account', {
        title: 'ACCOUNT',
        menu: menu,
        user: user
      });
  // }
};

exports.getNotAuthorized = function(req, res, next) {
  var user = req.user;
  var role = user.role;
  var menu = getMenu(role);
  res.render('account/not-authorized', {
    title: 'NOT AUTHORIZED',
    menu: menu
  });
};


/*
 * Function recusrively searches roles string with comma delimited role names, for a match to the role name contained in the role string. If a role string match is found, functions
 * returns true, else false.
 */
function isAuthorized(role, roles) {
  //    console.log('isAuthorized ' + role + ' ' + roles);
  var authorization = false;
  if (typeof role !== "undefined") {
    if (role.indexOf(",") > -1) {
      authorization = isAuthorized(role.split(",")[0], roles);
    } else {
      if (roles.indexOf(role) > -1) {
        authorization = true;
      }
    }
  }
  return authorization;
};

exports.isAuthorized = isAuthorized;
