/**
 * New node file
 */

var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var init = require('./init.js');

var server = http.createServer();
var io = socketio.listen(server);

var MEMBER = {};
var setMember = function (id, name) {
	MEMBER[id] = name;
};
var deleteMember = function (id) {
	delete MEMBER[id];
};
var modifyMember = function (id, name) {
	if (MEMBER[id] !== void(0)) {
		MEMBER[id] = name;
	}
};
var getMember = function () {
	var result = '';
	for (var prop in MEMBER) {
		result += MEMBER[prop] + ', ';
	}
	console.log('result : ' + result);
	return result;
};
var getName = function (id) {
	if (MEMBER[id] !== void(0)) {
		return MEMBER[id];
	}
	return null;
};

var CHAT = [];
var setChat = function (id, chat) {
	var name = getName(id);
	console.log(name);
	CHAT.push({'name': name, 'chat': chat});
};
var getChat = function () {
	var result = '';
	for (var i = CHAT.length - 1; i >= 0; --i) {
		result += CHAT[i].name + ' : ' + CHAT[i].chat + '<br />';
	}
	return result;
};

server.on('request', function (req, res) {
	fs.readFile('./room.html',
			function (err, data) {
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

io.sockets.on('connection', function (socket) {
	setMember(socket.id, 'NULL');
	io.sockets.emit('rewriteMember', getMember());
	
	socket.on('addMember', function (client) {
		console.log('name: ' + client);
		console.log(socket.id);
		
		setMember(socket.id, client);
		io.sockets.emit('rewriteMember', getMember());
	});
	
	socket.on('modifyName', function (client) {
		console.log('modify name: ' + client);
		console.log(socket.id);
		
		modifyMember(socket.id, client);
		io.sockets.emit('rewriteMember', getMember());
	});
	
	socket.on('messageChat', function (chat) {
		console.log('message : ' + chat);
		setChat(socket.id, chat);
		io.sockets.emit('rewriteChat', getChat());
	});
	
	socket.on('disconnect', function (client) {
		deleteMember(socket.id);
		io.sockets.emit('rewriteMember', getMember());
	});
});
