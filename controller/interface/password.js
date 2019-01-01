var bcrypt = require('bcryptjs');
var relational = require('../../model/relational.js');

bcrypt.hash('123', 10, function (err, passwordhash) {
    if (err) throw err;
    console.log(passwordhash);
});

JSON.parse('{"1":"No"}', function (k, v) {
    console.log(k); // log the current property name, the last is "".
    return v; // return the unchanged property value.
});
