/**
 * New node file
 */

var http = require('http');
var querystring = require('querystring');
var init = require('./init.js');

var HTML_HEAD = '\
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\
	<html xmlns="http://www.w3.org/1999/xhtml">\
	<head>\
	    <meta http-equiv="Content-Type" content="text/html ;charset=UTF-8" />\
	    <title>Lucky Number</title>\
	</head>\
	';

var HTML_BODY = '\
	<body>\
		<div>\
			<h1>Lucky Number</h1>\
			<form method="post" action="/">\
				<div>\
					Birthday\
					<label><input type="text" name="year" />Year</label>\
					<label><input type="text" name="month" />Month</label>\
					<label><input type="text" name="day" />Day</label>\
				</div>\
				<input type="submit" value="Lucky" />\
			</form>\
		</div>\
	</body>\
	';
var HTML_FOOT = '\
	</html>\
	';

var server = http.createServer();

server.on('request', function(req, res) {
	if (req.url !== '/') {
		res.writeHead(404, init.HEADER);
		res.end('Error 404: NOT FOUND');
		return;
	}
	
	if (req.method !== 'POST') {
		res.writeHead(200, init.HEADER);
		res.write(HTML_HEAD);
		res.write(HTML_BODY);
		res.write(HTML_FOOT);
		res.end();
		return;
	} else {
		req.data = '';
		req.on('readable', function() {
			req.data += req.read();
		});
		req.on('end', function() {
			var query = querystring.parse(req.data);
			var luckyNumber = query.day % 10;
			var resultHtml = '\
						<body>\
						<div>\
							あなたのラッキーナンバーは...  <em style="font-size: 30px">' + luckyNumber + '</em>  です！\
						</div>\
					</body>\
				';
			
			res.writeHead(200, init.HEADER);
			res.write(HTML_HEAD);
			res.write(resultHtml);
			res.write(HTML_FOOT);
			res.end();
		});
		return;
	}
	
});

server.listen(init.PORT, init.HOST, init.startServer);
