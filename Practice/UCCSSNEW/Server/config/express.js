
var express = require('express');
var morgan = require('morgan'); // used for logging
var logger = require('./logger');  // in the same folder (config)

module.exports = function (app, config) {
    // app is the express object from express.js
    // config is the config option we import from the config file

  app.use(function (req, res, next) {
    logger.log('info','Request from ' + req.connection.remoteAddress);
    next();
  });  

  // points to public folder for static content

  app.use(express.static(config.root + '/public'));

  // ********* start error handling

  app.use(function (req, res) {
    logger.log('error','File not found');
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);  // leave this as console because it will write the error object to the console
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

    // ********* end error handling

  logger.log('info','Starting application');

};
