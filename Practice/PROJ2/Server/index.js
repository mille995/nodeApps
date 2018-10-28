var http = require('http');
http.createServer(function(req, res){
	var path = req.url;
	console.log(path);
	switch(path){
		case '/':
			 res.writeHead(200, {"Content-Type": "text/plain"});
			 res.end('Homepage');
		case '/about':
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end('About');
		default:
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end('Not Found');

	}
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');

