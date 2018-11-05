var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('./logger');


module.exports = function (app, config) {

    if (process.env.NODE_ENV !== 'test') {   // added if statement for testing
        app.use(morgan('dev'));
        app.use(function (req, res, next) {
            logger.log('info', 'Request from ' + req.connection.remoteAddress);
            next();
        });
    }

    // for static files
    app.use(express.static(config.root + '/public'));

    // *** unit test data for unit testing - create an array of users and return the array to api/users
    var users = [{ name: 'John', email: 'woo@hoo.com' },
    { name: 'Betty', email: 'loo@woo.com' },
    { name: 'Hal', email: 'boo@woo.com' }
    ];

    app.get('/api/users', function (req, res) {
        res.status(200).json(users);
    });
    // *** unit test data for unit testing


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
