var properties = require('../properties.js');
var passport = require('passport');
var redis = require('redis');
var redisClient = redis.createClient(); // default setting.
var Request = require('request');

var menu = {
  'LOGIN': '/login'
};

var getMenu = function(role) {
  var m = {};
  if (role != undefined && role.indexOf(",") > -1) {
    m = getMenu(role.split(",")[0]);
  } else {
    if (('administrator').indexOf(role) > -1) {
      m = {
          'HOME': '/'
      }
    } else if (('consumer').indexOf(role) > -1) {
      m = {
          'HOME': '/'
      }
    } else {
      m = {
        'HOME': '/'
      }
    }
  }
  return m;
};

exports.getIndex = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('register/register', {
    menu: menu
  });
}

exports.getID = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/id', {
    title: 'register',
    menu: menu
  });
}

exports.getLocation = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/location', {
    title: 'register',
    menu: menu
  });
}


exports.postIndex = function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var confirm = req.body.confirm;
  if(validateEmail(name) && valid(name) && valid(confirm) && valid(password) && password == confirm){
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": "http://"+properties.service.auth.url+"/v1/auth/name",
      "body": JSON.stringify({
          "name": req.body.name
      })
    }, (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(body == "Unauthorized")  {
          Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://"+properties.service.auth.url+"/v1/auth",
            "body": JSON.stringify(req.body)
          }, (error, response, body) => {
            console.log(body);
              if(error) {
                  console.log(error);
              }
              var u = null;
              try {
                u = JSON.parse(body);
              } catch (e) {
                  // console.log(e);
              }
              res.render('register/email', {
                user: {name:req.body.name}
              });
            });
        } else {
            var u = null;
            try {
              u = JSON.parse(body);
            } catch (e) {
                // console.log(e);
            }
            if(!u.active) {
              res.render('register/email', {
                message: "Email already exits, need to verify",
                user: u
              });
            } else {
              res.render('public/login', {
                menu: menu,
                action: '/login',
                title: 'LOGIN'
              })
            }
        }
      });
    } else {
      var user = req.user;
      if (user !== undefined) {
        var role = user.role;
        menu = getMenu(role);
      }
      var message = "";
      if(!valid(name) || !validateEmail(name)){
        message = "Valid Email must be specified. "
      }
      if(!valid(confirm) || !valid(password)){
        message+= "Password and Confirm cannot be empty"
      } else if(confirm != password) {
        message+= "Passwords do not match"
      }
      res.render('register/register', {
        message: message,
        menu: menu,
        name: name
      });
    }
}

var validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var valid = function(value) {
  var boolean = true;
  if (typeof value === "undefined") {
    boolean = false;
  }
  if(value == null) {
    boolean = false;
  }
  if(value == undefined) {
    boolean = false;
  }
  if(value == ""){
    boolean = false;
  }
  return boolean;
};
