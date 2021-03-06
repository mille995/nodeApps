var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('./logger');
var mongoose = require('mongoose'); 
var bluebird = require('bluebird');
var glob = require('glob');
asyncHandler = require('express-async-handler');



module.exports = function (app, config) {

    // *** show the database is running
    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });


    // *** end show the database is running

    if (process.env.NODE_ENV !== 'test') {   // added 'if' statement for testing; dont write to console for test
        app.use(morgan('dev'));

        // *** added for database connection
        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });

        // standard
        app.use(function (req, res, next) {
            logger.log('info', 'Request from ' + req.connection.remoteAddress);
            next();
        });
    }

    // for static files
    app.use(express.static(config.root + '/public'));

    // parse inputs
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));


    // // require models and controllers -- only used without glob
    // require('../app/models/users');
    // require('../app/controllers/users')(app, config);

    // use glob for models and controllers
    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });


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
