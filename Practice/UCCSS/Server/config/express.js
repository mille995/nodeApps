var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('./logger');

module.exports = function (app, config) {

    app.use(function (req, res, next) {
    logger.log('info','Request from ' + req.connection.remoteAddress);
    console.log("port: ", config.port)
    next();
  });  

  app.use(morgan('dev'));

  ///app.use(bodyParser.json());  on the slide but not copied in the video at 54:02
  app.use(bodyParser.urlencoded({
  extended: true
  }));
  

  app.use(express.static(config.root + '/public'));

  require('../app/controllers/users')(app, config);
  

    function One(req, res, next){
	    res.set('X-One','One');
	    next();
    };

    function Two(req, res, next){
	    res.set('X-Two','Two');
	    next();
    }

    app.get('/willwork', [One, Two], function(req, res){
	    res.send('Three');
    });


  app.use(function (req, res) {
    logger.log('error', 'File not found');
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);  // writes an error object to the console.  Middleware will pass that error, e.g., from DB
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  console.log("Starting application");

};

