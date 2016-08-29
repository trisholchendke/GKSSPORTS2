var express = require('express'); 
var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var db = mongojs('collection_users', 
		[
		 	'collection_videos',
		 	'collection_tag_center_login',
		 	'collection_sponsor_login',
		 	'collection_uploaded_logos',
		 	'collection_uploaded_advertisements',
		 	'collection_uploaded_documents',
		]
	);

app.use(express.static('../client'));
app.use(bodyParser.json());  

app.use(cookieParser('notsosecretkey'));
app.use(session({secret: 'notsosecretkey123'}));

var port = process.env.PORT || 3000;
app.listen(port, function () { console.log("Listening on port " + port); });

require('./collection_videos.js')(app, db);
require('./collection_tag_center_login.js')(app, db);
require('./collection_session.js')(app, db);
require('./collection_sponsor_login.js')(app, db);
require('./collection_image_upload_to_server.js')(app, db);
require('./collection_uploaded_advertisements.js')(app, db);
require('./collection_uploaded_documents.js')(app, db);









