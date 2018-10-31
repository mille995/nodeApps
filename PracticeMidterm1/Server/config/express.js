var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');  // needed for database
var bluebird = require('bluebird');  // needed for promises that mongoose uses

module.exports = function (app, config) {

  // connect to the database
  console.log( "Loading Mongoose functionality");
  mongoose.Promise = bluebird;
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  mongoose.set('debug', true); // log database actions
  mongoose.connection.once('open', function callback() {
    console.log('info', 'Mongoose connected to the database');
  });

  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress);
    next();
  });



  // bodyParser parses out parameters in the URL and data from a form
  app.use(bodyParser.urlencoded({
    extended: true
  }));

 app.use(bodyParser.json());

  app.use(express.static(config.root + '/public'));

  require('../app/models/todos');
  require('../app/controllers/todos')(app, config);


  console.log("Starting application");

  // ********* start error handling

  app.use(function (req, res) {
    console.log('File not found');
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

  console.log('info', 'Starting application');

};