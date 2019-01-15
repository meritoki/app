/*
 * Name: properties.js
 * Author: Joaquin Osvaldo Rodriguez
 * Date: 201807
 * Copyright: 2018 Meritoki 2018 All Rights Reserved
 */
var properties = {}

properties.host = 'dailybread.meritoki.com';
properties.name = "app";
properties.version = "0.1";
properties.https = false;

properties.port = {};
properties.port.http = '80';
properties.port.https = '8443';
//app
properties.web = {};
properties.web.app = {};
properties.web.app.switch = true;
properties.web.app.https = 443;
properties.web.app.http = 80;
properties.web.app.maintenance = {};
properties.web.app.maintenance.switch = false;
properties.web.app.maintenance.date = "November 20, 2015 01:00 AM"
properties.web.app.session = {};
properties.web.app.session.maxAge = 7200000; //1 hour in milliseconds
properties.web.app.session.secret = 'color';
//0.37.0
properties.maintenance = {};
properties.maintenance.switch = false;
properties.maintenance.date = "November 20, 2015 01:00 AM"
properties.cookie = {};
properties.cookie.secret = '123';

properties.email = {};
properties.email.address = 'meritoki@gmail.com';
properties.email.password = '';
properties.email.service = 'Gmail';

properties.security = {};
properties.security.keyPath = './controller/security/key/key.pem';
properties.security.certificatePath = './controller/security/certificate/*/*.crt';
properties.security.certificateExternalCAPath = './controller/security/certificate/*/*.crt';
properties.security.certificateTrustCAPath = './controller/security/certificate/*/*.crt';
properties.security.certificateDomainValidationPath = './controller/security/certificate/*/*.crt';

properties.log = {};
properties.log.path = '/var/log/meritoki/metanoia/';
properties.log.filename = 'app.express';
properties.phone = {};
properties.phone.provider = 'twilio';
properties.phone.acountSID = '';
properties.phone.authToken = '';
properties.phone.from='';

properties.service = {};
properties.service.auth = {};
properties.service.auth.hostname = 'localhost';
properties.service.auth.port = 3000;
properties.service.auth.url = properties.service.auth.hostname+':'+properties.service.auth.port

properties.service.user = {};
properties.service.user.hostname = 'localhost';
properties.service.user.port = 3001;
properties.service.user.url = properties.service.user.hostname+':'+properties.service.user.port

properties.service.location = {};
properties.service.location.hostname = 'localhost';
properties.service.location.port = 3002;
properties.service.location.url = properties.service.location.hostname+':'+properties.service.location.port

properties.service.id = {};
properties.service.id.hostname = 'localhost';
properties.service.id.port = 3003;
properties.service.id.url = properties.service.id.hostname+':'+properties.service.id.port

properties.service.msg = {};
properties.service.msg.hostname = 'localhost';
properties.service.msg.port = 3004;
properties.service.msg.url = properties.service.msg.hostname+':'+properties.service.msg.port

properties.session = {};
properties.session.maxAge = 7200000; //1 hour in milliseconds
properties.session.secret = 'color';
module.exports = properties;
