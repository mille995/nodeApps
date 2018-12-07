var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
HelpTicket = mongoose.model('HelpTicket');
HelpTicketContent = mongoose.model('HelpTicketContent')
asyncHandler = require('express-async-handler');
passportService = require('../../config/passport'),
    passport = require('passport');

// need requireAuth but non requireLogin
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    // get helpTickets
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
            // this joins withh the User model and pull the values for personId and owenerId from it 
            .populate({ path: 'personId', model: 'User', select: 'lastname firstname fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastname firstname fullName' });
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

    // get helpTickets by user ID -- in process - started from get helpTickets route
    router.get('/helpTickets/user/:userObj._id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get helpTickets for logged in user');
        let query = HelpTicket.find();
        query.sort(req.query.order)
            // this joins withh the User model and pull the values for personId and owenerId from it 
            .populate({ path: 'personId', model: 'User', select: 'lastname firstname fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastname firstname fullName' });
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
    router.get('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get helpTicket %s', req.params.id);
        await HelpTicket.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    // update helpTickets
    router.put('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicket');
        console.log(req.body)
        await HelpTicket.findOneAndUpdate({ _id: req.body.helpTicket._id }, req.body.helpTicket, { new: true })
            .then(result => {
                if (req.body.content) {
                    req.body.content.helpTicketId = result._id;
                    var helpTicketContent = new HelpTicketContent(req.body.content);
                    helpTicketContent.save()
                        .then(content => {
                            res.status(201).json(result);
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));

    // create a helpTicket
    router.post('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket');
        var helpTicket = new HelpTicket(req.body);
        const result = await helpTicket.save()
        // .then(result => {
        //     req.body.content.helpTicketId = result._id;
        //     var helpTicketContent = new HelpTicketContent(req.body.content);
        //     helpTicketContent.save()
        //         .then(content => {
        res.status(201).json(result);
        //         })
        // })
    }));


    // Get helpTickets
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // Delete helpTickets
    router.delete('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting helpTicket %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    // get helpTicket Content
    router.get('/helpTicketContents', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Getting Helpticket Content');
        let query = HelpTicketContent.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    // get helpTicket Content by ID
    router.get('/helpTicketContents/helpTicket:id', requireAuth, asyncHandler(async (req, res) => {
        let query = HelpTicketContent.find({ helpTicketId: req.params.id });
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    // Create helpTicket Content
    router.post('/helpTicketContents', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Content');
        var helpTicketContent = new HelpTicketContent(req.body);
        const result = await helpTicketContent.save()
        res.status(201).json(result);


    // Add status requirement
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
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
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });
    }));

}));

};