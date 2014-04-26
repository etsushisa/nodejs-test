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
	console.log('Server: connection');
//	socket.emit('my_event', {eventName: 'my_event', message: 'connected'});
	socket.emit('my_event', 'Me', function(data) {
		console.log("client:" + data);
	});
	
//	socket.volatile.emit('my_event', 'Connected', function(data) {
//		console.log("client:" + data);
//	});
	
	socket.broadcast.emit('my_event', 'Broadcast', function(data) {
		console.log('Client:' + data);
	});
//	socket.send('connected', function() {
//		console.log('Client: received message');
//	});
	
	io.sockets.emit('my_event', 'All');
});

io.sockets.on('disconnect', function(socket) {
	console.log('Server: disconnect');
});
