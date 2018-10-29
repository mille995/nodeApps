
var express = require('express');

module.exports = function (app, config) {
    // app is the express object from express.js
    // config is the config option we import from the config file

  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress);
    next();
  });  

  // points to public folder for static content

  app.use(express.static(config.root + '/public'));

  // ********* start error handling

  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

    // ********* end error handling

  console.log("Starting application");

};
