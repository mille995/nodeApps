console.log('express.js');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('./logger');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');


module.exports = function (app, config) {

  logger.log('info', "Loading Mongoose functionality");
  mongoose.Promise = bluebird;
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  // the if statement keeps messages from being logged to the console during testing
  // because that can cause problems with test

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log('info', 'Mongoose connected to the database');
    });

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }


  app.use(function (req, res, next) {
    logger.log('info', 'Request from ' + req.connection.remoteAddress);
    console.log("port: ", config.port);
    next();
  });

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(express.static(config.root + '/public'));

  // loads all of the models from app/models regardless of how many files there are
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });
  console.log('models in glob');

  // loads all of the controllers in app/controllers regardless of how many files there are

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });
  console.log('controllers in glob');

  // no longer used when the controllers above were added
 // require('../app/controllers/users')(app, config);


  function One(req, res, next) {
    res.set('X-One', 'One');
    next();
  }

  function Two(req, res, next) {
    res.set('X-Two', 'Two');
    next();
  }

  app.get('/willwork', [One, Two], function (req, res) {
    res.send('Three');
  });


  app.use(function (req, res) {
    logger.log('error', 'File not found');
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);  // writes an error object to the console.  Middleware will pass that error, e.g., from DB
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  console.log("Starting application");

};

console.log('bottom_express.js');