
  var Request = require("request");

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

  exports.postEmailVerification = function(req, res, next) {
      Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:3004/v1/msg/email/verification",
        "body": JSON.stringify({
            "to": req.body.to
        })
      }, (error, response, body) => {
          if (error) {
            res.end(error);
          } else {
            res.end(body);
          }
      });
  }

  exports.getVerify = function(req, res, next) {
    var user = req.user;

    if (user !== undefined) {
      var role = user.role;
      menu = getMenu(role);
    }
    Request.get({
      "headers": { "content-type": "application/json" },
      "url": "http://localhost:3004/v1/msg/email/verify",
      "qs": {
          "mail": req.query.mail,
          "id": req.query.id
      }
    }, (error, response, body) => {
        if (error) {
          res.end(error);
        } else {
          var user = JSON.parse(JSON.parse(body));
          if(user.active) {
            res.render('public/login', {
              menu: menu,
              action: '/login',
              title: 'LOGIN'
            })
          } else {
            res.render('register/email', {
              message: "Email exits, need to verify",
              user: user
            });
          }
        }
    });
  }
