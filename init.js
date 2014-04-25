/**
 * New node file
 */

/**
 * 
 */
exports.HOST = '127.0.0.1';
exports.PORT = 1337;
exports.startServer = function() {
	console.log('Server running at http://' + exports.HOST + ':' + exports.PORT + '/');
	console.log('Press [ctrl + c] to stop the server.');
};

exports.HEADER = { 'Content-Type': 'text/html; charset=UTF-8' };
