var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
HelpTicket = mongoose.model('HelpTicket');
HelpTicketContent = mongoose.model('HelpTicketContent')
asyncHandler = require('express-async-handler');


module.exports = function (app, config) {
    app.use('/api', router);

    // create helpTickets
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket');
        var user = new HelpTicket(req.body);
        const result = await helpTicket.save()
        res.status(201).json(result);
    }));

    // get helpTickets
    router.get('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
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

};