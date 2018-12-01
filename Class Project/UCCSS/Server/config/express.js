var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
asyncHandler = require('express-async-handler');
var cors = require('cors');


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

    app.use(cors({origin: 'http://localhost:9000'}));

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
        extended: true
    }));

    app.use(function (req, res, next) {
        console.log('Request from ' + req.connection.remoteAddress);
        next();
    });

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

    // *** unit testing - test data 
    var users = [{ name: 'John', email: 'woo@hoo.com' },
    { name: 'Betty', email: 'loo@woo.com' },
    { name: 'Hal', email: 'boo@woo.com' }
    ];

    // *** unit testing - get the data from the array in 'users' above
    app.get('/api/users', function (req, res) {
        res.status(200).json(users);
    });

    // *** 404 error
    app.use(function (req, res) {
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    // ** server error and pass-through for a login error
    app.use(function (err, req, res, next) {
        console.log(err);
        if (process.env.NODE_ENV !== 'test') logger.log(err.stack,'error');
        res.type('text/plan');
        if(err.status){
          res.status(err.status).send(err.message);
        } else {
          res.status(500).send('500 Sever Error');
        }
      });
    

    logger.log('info', "Starting application");

};
