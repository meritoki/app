var properties = require('../properties.js');
var twilio = require('twilio');
var user = require('./user.js');
// var client = new twilio.RestClient('AC58bc2c0137b2aac23b805fc25e642495', 'e6e70d30ee1f8761597dcd594501206f');
var client = new twilio.RestClient('AC3bc642a06bdd2fe29860533605629696', '9e7e573393f4dba697de92a73d59651f');

var textMessage = function (to, from, body, complete) {
    client.sms.messages.create({
        body: body,
        to: to,
        from: from
    }, complete);
}

var test = function (to) {
    textMessage(to, properties.phone.from, 'Hello World', function (error, message) {
        if (!error) {
            console.log(message.sid);
        } else {
            console.log(error);
        }
    });
}

var welcome = function (to) {
    textMessage(to, properties.phone.from, 'Welcome to Metanoia!', function (error, message) {
        if (!error) {
            console.log(message.sid);
        } else {
            console.log('error=' + error);
        }
    });
}

var start = function (to) {
    textMessage(to, properties.phone.from, 'Management System Started', function (error, message) {
        if (!error) {
            console.log(message.sid);
        } else {
            console.log('error=' + error);
        }
    });
}

var message = function (to,m) {
    console.log('phone.message');
    textMessage(to, properties.phone.from, m, function (error, message) {
        if (!error) {
            console.log(message.sid);
        } else {
            console.log(error);
        }
    });
}

exports.sendMessage = message;
exports.sendTest = test;
exports.sendWelcome = welcome;

exports.postMessage = function(req,res,next){
  var requestUser = req.user;
  var userIDUser = requestUser.idUser;
  var userRole = requestUser.role;
  if (user.isAuthorized(userRole, "general-manager,training-manager,safety-manager,quality-manager")) {

  }
}

exports.getIndex = function(req,res,next){
  var requestUser = req.user;
  var userIDUser = requestUser.idUser;
  var userRole = requestUser.role;
  if (user.isAuthorized(userRole, "general-manager,training-manager,safety-manager,quality-manager")) {
    res.render('account/phone', {
      title: 'PHONE',
    });
  }
}
