var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
mongoose = require('mongoose');
HelpTicket = mongoose.model('HelpTicket');
HelpTicketContent = mongoose.model('HelpTicketContent')
asyncHandler = require('express-async-handler');
passportService = require('../../config/passport'),
    passport = require('passport');
multer = require('multer');
mkdirp = require('mkdirp');

// need requireAuth but non requireLogin
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    // get helpTickets
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        console.log(req.params);
        let query = HelpTicket.find();
        query.sort(req.query.order)
        // this joins withh the User model and pull the values for personId and owenerId from it 
        // .populate({ path: 'personId', model: 'User', select: 'lastname firstname fullName' })
        // .populate({ path: 'ownerId', model: 'User', select: 'lastname firstname fullName' });
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

    // get helpTickets by user ID
    router.get('/helpTickets/user/:userObj', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all helpTickets');
        console.log(req.params.userObj);
        let query = HelpTicket.find({ personId: req.params.userObj });
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

    // get helpTicketContents by helpTicket ID
    router.get('/helpTicketContents/helpTicket/:helpTicketId', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get helpTicket content for a helpticket');
        console.log(req.params.helpTicketId);
        let query = HelpTicketContent.find({ helpTicketId: req.params.helpTicketId });
        query.sort(req.query.order)
        // this joins withh the User model and pull the values for personId and owenerId from it 
        // .populate({ path: 'personId', model: 'User', select: 'lastname firstname' })
        // .populate({ path: 'ownerId', model: 'User', select: 'lastname firstname' });
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
                            res.status(201).json({ contentID: content._id });
                        })
                } else {
                    res.status(200).json(result);
                }
            })
    }));

    // create a helpTicket with content
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket');
        var helpTicket = new HelpTicket(req.body.helpTicket);
        await helpTicket.save()
            .then(result => {
                req.body.content.helpTicketId = result._id;
                var helpTicketContent = new HelpTicketContent(req.body.content);
                helpTicketContent.save()
                    .then(content => {
                        res.status(201).json({ contentID: content._id });
                    })
            })
    }));


    // // Original Get helpTickets for reference only
    // router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
    //     logger.log('info', 'Original get all HelpTickets');
    //     let query = HelpTicket.find();
    //     query.sort(req.query.order)
    //     await query.exec().then(result => {
    //         res.status(200).json(result);
    //     })
    // }));

    // Delete helpTickets
    router.delete('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting helpTicket %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    // Delete helpTicket Content for a helpTicket -- in process

    router.delete('/helpTicketContents/helpTicket/:helpTicketId', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Delete content for helpTicket %s', req.params.helpTicketId);
        await HelpTicketContent.remove({ helpTicketId: req.params.helpTicketId })
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


    // Create helpTicket Content
    router.post('/helpTicketContents', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating helpTicket Content');
        var helpTicketContent = new HelpTicketContent(req.body);
        const result = await helpTicketContent.save()
        res.status(201).json(result);

    }));

    // file upload - creates the storage variable to be used in the file upload and appends date to the filename 
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + '/helpTickets';
            mkdirp(path, function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            file.fileName = file.originalname;
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    // file upload - has saved file data
    var upload = multer({ storage: storage });

    // file upload - uploads the file(s) / id is content document ID
    router.post('/helpTicketContents/upload/:id', upload.any(), asyncHandler(async (req, res) => {
        logger.log('info', 'Uploading files');
        await HelpTicketContent.findById(req.params.id).then(result => {
            for (var i = 0, x = req.files.length; i < x; i++) {
                var file = {
                    originalFileName: req.files[i].originalname,
                    fileName: req.files[i].filename
                };
                result.file = file;
            }
            result.save().then(result => {
                res.status(200).json(result);
            });
        })
    }));

};