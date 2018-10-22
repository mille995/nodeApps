//****************************** */
//create a server using Express
//****************************** */

// var express = require('express');  // no path is required since it is a node module

// var app = express();  // creates the application server object; use this variable name

// // this implements a route
// app.get('/', function(req, res){
//     res.send('Hello World!');
// });

// app.listen(3300);

//****************************** */
//Configure a port in Express
//****************************** */

// var express = require('express');

// var app = express();

// app.set('port', process.env.PORT || 3000);

// app.get('/',function(req,res){
// 	res.send('Hello New World!');
// });

// app.listen(app.get('port'), function(){
// 	console.log('Express started on http://localhost:' + app.get('port'));
// });

//****************************** */
//Middleware in Express
//****************************** */

var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

// path normalize will find the path to the public folder in this project
// this will be used for static assets 
app.use(express.static(path.normalize(__dirname) + '/public'));

// this code is the middleware
// it gets the IP address of the request object
// note it has a 'next' object
app.use(function(err, req, res, next){
  console.log('Request from ' + req.ip);
  next();
});


app.get('/',function(req,res){
	res.send('Hello World!');
});

app.get('/about', function(req, res){
	res.send('Learn all About Us!');
});

app.get('/about/directions', function(req, res){
	res.send('How to Find Us!');
});

// these error handlers should go after the route
app.use(function(req, res){
	res.type('text/plan');
	res.status(404);
	res.send('404 Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plan');
	res.status(500);
    res.send('500 Sever Error');
});

http.createServer(app).listen(3000, function(){
	console.log('Express server listening on port ' + 3000);
})
