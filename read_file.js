/**
 * New node file
 */

var HOST = '127.0.0.1';
var PORT = 1337;

var fs = require('fs');
var util = require('util');

(function test() {
	fs.readFile('testdata', 'utf8', function(err, data) {
		console.log('File read!');
		console.log(data);
	});
	
	console.log('Called fs.readFile');
	
	for (var i = 0; i < 10000; i++) {
		util.print('.');
	}
})();