var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
bluebird = require('bluebird');
asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);

    // router.route('/users').get(function (req, res, next) {
    //     logger.log('info', 'Get all users', 'verbose');
    //     res.status(200).json({ message: 'Got all users' });
    // });

    router.post('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating user');
        var user = new User(req.body);
        const result = await user.save()
        res.status(201).json(result);
    }));

    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all users');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get user %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.put('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating user');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));


};
