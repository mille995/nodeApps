/********************************** */
// require OS and log some values
/********************************* */
// var os = require('os');
// console.log(os.hostname());
// console.log(os.type());
// console.log(os.platform());
// console.log((os.arch()));


/********************************** */
// establish an http server and say Hello World
/********************************* */
// var http = require('http');
// http.createServer(function(req, res){
// res.writeHead(200, {'Content-Type':'text/plain'});
// res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');


/********************************** */
// using a callback
// separate the response into the responseHandler function
/********************************* */
// var http = require('http');

// function responseHandler(req, res){
//     res.writeHead(200, {'Content-Type':'text/plain'});
//     res.end('Howdy World\n');
// }
// http.createServer(responseHandler).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');


/********************************** */
// Processing Query Strings
/********************************* */

// var http = require('http');
// var url = require('url');

// function responseHandler(req, res){
//     var queryData = url.parse(req.url, true).query;
//     // caveman debugging
//     console.log(queryData);
//     res.writeHead(200, {"Content-Type" : "text/plain" })    

//     if (queryData.name){
//         // user told us thier nae in theh GET request, ex: http://localhost:1337/?name=Tom
//         res.end('Hello ' + queryData.name + '\n');
//     } else {
//         res.end("Hello World\n")
//     }
// }

// var server = http.createServer(responseHandler);
// server.listen(1337);
// console.log('Server running at http://127.0.0.1:1337/');


/********************************** */
// Simple Routing
/********************************* */

// var http = require('http');
// http.createServer(function(req, res){
// 	var path = req.url;
// 	console.log(path);
// 	switch(path){
// 		case '/':
// 			 res.writeHead(200, {"Content-Type": "text/plain"});
// 			 res.end('This is the Homepage');
// 		case '/about':
// 			res.writeHead(200, {"Content-Type": "text/plain"});
// 			res.end('This is About');
// 		default:
// 			res.writeHead(404, {"Content-Type": "text/plain"});
// 			res.end('Not Found');

// 	}
// }).listen(1337);

// console.log('Server running at http://127.0.0.1:1337/');

/********************************** */
// Serving Files
/********************************* */

var http = require('http');
var fs = require('fs');   // file system module
var url = require('url');

var ROOT_DIR = "html/";

var port = process.env.port || 1337  // port is either an env variable or 1337
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    // read from the html folder; function is a callback 
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(port);
console.log('Server running at http://127.0.0.1:1337/');
