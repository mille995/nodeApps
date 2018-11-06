var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');  // needed for database
var bluebird = require('bluebird');  // needed for promises that mongoose uses

module.exports = function (app, config) {

    // connect to the database
    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    mongoose.set('debug', true); // log database actions
    mongoose.connection.once('open', function callback() {
        logger.log('info', 'Mongoose connected to the database');
    });

    app.use(morgan('dev'));

    app.use(function (req, res, next) {
        logger.log('info', 'Request from ' + req.connection.remoteAddress);
        next();
    });


    // Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    require('../app/models/foos');
    require('../app/controllers/foos')(app, config);

    logger.log('info', "Starting application");


    // *** error handling
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

    // *** error handling
};
