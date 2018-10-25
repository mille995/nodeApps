console.log("controllers/users.js");

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),

    // see the models / users.js file for the model
    User = (mongoose.model('User')); // uppercase is the model (vs. the instance)

module.exports = function (app, config) {
    app.use('/api', router);
    // all routes must be in this area

    router.route('/users').get(function (req, res, next) {
        logger.log('info', 'Get all users');
        res.status(200).json({ message: 'Get all users' });

    });

    router.route('/users/:id').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get user ' + req.params.id });
    });

    router('/users').post(function (req, res, next) {
        logger.log('Create User', 'verbose');
        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch( err => {
                return next(err);
            });
    })

    var obj = { 'email': email, 'password': password };
    res.status(201).json(obj);
};

console.log("bottom/controllers_users.js");

