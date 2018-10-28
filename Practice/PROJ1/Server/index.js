var http = require('http');
var url = require('url');

function responseHandler(req, res) {
    var queryData = url.parse(req.url, true).query;   // uses url module to parse the query parameters 
    //                                                   from the URL
    res.writeHead(200, {"Content-Type": "text/plain"});

    if (queryData.name) {
        // user told us their name in the GET request, ex: http://localhost:1337/?name=Tom
        res.end('Hello ' + queryData.name + '\n');
    } else {
        res.end("Hello World\n");
    }
}

var server = http.createServer(responseHandler);

server.listen(1337);

console.log('Server running at http://127.0.0.1:1337');     // logs to the console (terminal)
