
var express = require('express'),
	router = express.Router(),  // create the express logger
	logger = require('../../config/logger');  //goes up to the server folder and comes back down
mongoose = require('mongoose');
User = mongoose.model('User');
asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
	app.use('/api', router);  // adds /api to every URL

	// get all users
	router.get('/users', asyncHandler(async (req, res) => {
		logger.log('info', 'Get all users');
		let query = User.find();
		query.sort(req.query.order)
		await query.exec().then(result => {
			res.status(200).json(result);
		})
	}));

	// get a user with ID
	router.get('/users/:id', asyncHandler(async (req, res) => {
		logger.log('info', 'Get user %s', req.params.id);
		await User.findById(req.params.id).then(result => {
			res.status(200).json(result);
		})
	}));

	// update a user
	router.put('/users', asyncHandler(async (req, res) => {
		logger.log('info', 'Updating user');
		await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
			.then(result => {
				res.status(200).json(result);
			})
	}));

	// delete a user
	router.delete('/users/:id', asyncHandler(async (req, res) => {
		logger.log('info', 'Deleting user %s', req.params.id);
		await User.remove({ _id: req.params.id })
			.then(result => {
				res.status(200).json(result);
			})
	}));

	// create a new user
	router.post('/users', asyncHandler(async (req, res) => {
		logger.log('info', 'Creating user');
		var user = new User(req.body);
		const result = await user.save()
		res.status(201).json(result);
	}));

	// this is from the login functionality; not sure if it works
	router.post('/login', function (req, res, next) {
		console.log(req.body);
		var email = req.body.email
		var password = req.body.password;

		var obj = { 'email': email, 'password': password };
		res.status(201).json(obj);
	});

};  
