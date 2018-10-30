var express = require('express');
var config = require('./config/config');
var app = express();
var port = process.env.port || 3300
require('./config/express')(app, config);
require('http').createServer(app).listen(config.port, function () {
console.log("HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});
