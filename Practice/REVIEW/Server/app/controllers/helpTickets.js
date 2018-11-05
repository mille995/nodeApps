var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
HelpTicket = mongoose.model('HelpTicket');
HelpTicketContent = mongoose.model('HelpTicketContent')
asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);

    // get helpTickets
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
        // .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
        // .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });
        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        }
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // Get helpTicket by ID
    router.get('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get helpTicket %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    // update helpTickets
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating helpTicket');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    // create helpTickets
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket');
        var helpTicket = new HelpTicket(req.body);
        const result = await helpTicket.save();
        res.status(201).json(result);
    }));

    // Get helpTickets
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // Delete helpTickets
    router.delete('/helpTickets/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting helpTicket %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    // get helpTicket Content
    router.get('/helpTicketContents', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting Helpticket Content');
        let query = HelpTicketContent.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // get helpTicket Content by ID
    router.get('/helpTicketContents/helpTicket:id', asyncHandler(async (req, res) => {
        let query = HelpTicketContent.find({ helpTicketId: req.params.id });
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    // Create helpTicket Content
    router.post('/helpTicketContents', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Content');
        var helpTicketContent = new HelpTicketContent(req.body);
        const result = await helpTicketContent.save()
        res.status(201).json(result);

        // Add status requirement
        router.get('/helpTickets', asyncHandler(async (req, res) => {
            logger.log('info', 'Get all HelpTickets');
            let query = HelpTicket.find();
            query.sort(req.query.order)
            if (req.query.status) {
                if (req.query.status[0] == '-') {
                    query.where('status').ne(req.query.status.substring(1));
                } else {
                    query.where('status').eq(req.query.status);
                }
            }
            await query.exec().then(result => {
                res.status(200).json(result);
            })
        }));

        // Add populate requirement
        router.get('/helpTickets', asyncHandler(async (req, res) => {
            logger.log('info', 'Get all HelpTickets');
            let query = HelpTicket.find();
            query.sort(req.query.order)
                .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
                .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });
        }));
    }));
};