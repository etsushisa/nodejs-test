/**
 * New node file
 */

var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var init = require('./init.js');

var server = http.createServer();
var io = socketio.listen(server);

server.on('request', function(req, res) {
	fs.readFile('./client.html', function(err, data) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end('Server error : ' + err);
		}
		
		res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
		res.end(data);
	});
});


server.listen(init.PORT, init.HOST, init.startServer);

io.sockets.on('connection', function(socket) {
//	socket.emit('my_event', {eventName: 'my_event', message: 'connected'});
	socket.emit('my_event', 'connected', function(data) {
		console.log("client:" + data);
	});
//	socket.send('connected', function() {
//		console.log('Client: received message');
//	});
});
