/*
 * Name: public.js
 * Author: Joaquin Rodriguez
 * Date: 201511
 */
var properties = require('../properties.js');
var passport = require('passport');
var redis = require('redis');
var redisClient = redis.createClient(); // default setting.

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

exports.getVerify=  function(req, res) {
  if((req.protocol+"://"+req.get('host')) === ("http://"+host)) {
      async.waterfall([
        function(callback) {
          let decodedMail = new Buffer(req.query.mail, 'base64').toString('ascii');
          redisClient.get(decodedMail,function(err,reply) {
            if(err) {
              return callback(true,"Error in redis");
            }
            if(reply === null) {
              return callback(true,"Invalid email address");
            }
            callback(null,decodedMail,reply);
          });
        },
        function(key,redisData,callback) {
          if(redisData === req.query.id) {
            redisClient.del(key,function(err,reply) {
              if(err) {
                return callback(true,"Error in redis");
              }
              if(reply !== 1) {
                return callback(true,"Issue in redis");
              }
              callback(null,"Email is verified");
            });
          } else {
            return callback(true,"Invalid token");
          }
        }
      ],function(err,data) {
        res.send(data);
      });
    } else {
      res.end("<h1>Request is from unknown source");
    }

}

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


exports.getRegister = function(req, res) {
  var user = req.user;
  if (user !== undefined) {
    var role = user.role;
    menu = getMenu(role);
  }
  res.render('public/register', {
    title: 'register',
    menu: menu
  });
}

exports.getRegisterID = function(req, res) {
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

exports.getRegisterLocation = function(req, res) {
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

// exports.postLogin = function(req, res, next) {
//   console.log("hello world");
// }


exports.getNotAuthorized = function(req, res, next) {
  var user = req.user;
  var role = user.role;
  var menu = getMenu(role);
  res.render('account/not-authorized', {
    title: 'NOT AUTHORIZED',
    menu: menu
  });
};
