
var express = require('express'),
	router = express.Router(),  // create the express logger
	logger = require('../../config/logger');  //goes up to the server folder and comes back down

module.exports = function (app, config) {
	app.use('/api', router);  // adds /api to every URL

	router.route('/users').get(function (req, res, next) {
		logger.log('info', 'Get all users', 'verbose');
		res.status(200).json({ message: 'Got all users' }); //this is a stub - it just sends a message
	});

	router.route('/users/:id').get(function (req, res, next) {
		logger.log('info', 'Get user %s', req.params.id);
		res.status(200).json({ message: 'Get user ' + req.params.id });
	});

};  
