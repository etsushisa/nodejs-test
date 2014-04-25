/**
 * New node file
 */

/**
 * 
 */
var http = require('http');
var url = require('url');

var path;
try {
	path = require.resolve('./init.js');
	var init = require(path);
} catch (e) {
	console.log(e);
}

var server = http.createServer();
server.on('request', function(req,res) {
	
	res.writeHead(200);
	
	if (req.url === '/') {
		res.end('Hello World!');		
	} else if (req.url === '/info') {
		res.write("URL : " + req.url + "\n");
		res.write("Method : " + req.method + "\n");
		
		Object.keys(req.headers).forEach(function (key) {
			res.write(key + ' : ' + req.headers[key] + '\n');
		});		
	}
	
	if (req.method === 'POST') {
		var data = '';
		req.on('readable', function() {
			data += req.read();
		});
	}
	
	res.end();
});

server.listen(init.PORT, init.HOST, init.startServer);

/*
http.createServer(function (req, res) {
	//
	console.log(req.url);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World! From : ' + req.url);
}).listen(PORT, HOST, function() {
	// 
	console.log('Server running at http://127.0.0.1:1337/');
	console.log('Press [ctrl + c] to stop the server.');
});
*/
