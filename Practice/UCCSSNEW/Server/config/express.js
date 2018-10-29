
var express = require('express');
var morgan = require('morgan'); // used for logging
var logger = require('./logger');  // in the same folder (config)
var bodyParser = require('body-parser');
var morgan = require('morgan');  // used for logging
var mongoose = require('mongoose');  // needed for database
var bluebird = require('bluebird');  // needed for promises that mongoose uses
var glob = require('glob'); //reads and imports all the models an controllers at once instead of individually



module.exports = function (app, config) {
    // app is the express object from express.js
    // config is the config option we import from the config file

    // connect to the database
    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });


    if (process.env.NODE_ENV !== 'test') {  // don't log to the console when testing
        app.use(morgan('dev'));

        mongoose.set('debug', true); // log database actions
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });

        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }

    // bodyParser parses out parameters in the URL and data from a form
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    // points to public folder for static content
    app.use(express.static(config.root + '/public'));


    // original command:  require('../app/controllers/users')(app, config);
    // added when routes were added to users.js controller file; 
    // replaced by glob commands below

    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });


    // ********* start error handling

    app.use(function (req, res) {
        logger.log('error', 'File not found');
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

    logger.log('info', 'Starting application');

};
