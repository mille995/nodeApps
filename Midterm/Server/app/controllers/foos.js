var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
Foo = mongoose.model('Foo');
asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    // Create a foo
    router.post('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating user');
        var user = new User(req.body);
        const result = await user.save()
        res.status(201).json(result);
    }));

    // Get all foos
    router.get('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all foos');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // get a specific foo
    router.get('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get foo %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    // update a foo
    router.put('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating foo');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    // delete a foo
    router.delete('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting foo %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};