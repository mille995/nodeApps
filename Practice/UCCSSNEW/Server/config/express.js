
var express = require('express');
var morgan = require('morgan'); // used for logging
var logger = require('./logger');  // in the same folder (config)
var bodyParser = require('body-parser');
var morgan = require('morgan');


module.exports = function (app, config) {
    // app is the express object from express.js
    // config is the config option we import from the config file

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

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

    // added when routes were added to users.js controller file
    require('../app/controllers/users')(app, config);

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
