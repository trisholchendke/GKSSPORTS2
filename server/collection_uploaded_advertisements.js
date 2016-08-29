(function () {	'use strict';

module.exports = function(app, db){
	
var fs = require('fs');	
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '../client/uploads/upload_advertisements');
    },
    filename: function (req, file, cb) {
    	console.log(file);
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        file['advertisement_url'] = 'uploads/upload_advertisements/' + file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        file['file_name'] = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
    }
});

var upload = multer({ //multer settings
                storage: storage
}).single('file');

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/upload_advertisement', function(req, res) {
	upload(req,res,function(err){
//	console.log(req.file);
//	console.log(req.body);
		req.file['advertisement_title'] = req.body.advertisement_title;
//		console.log(req.file);
		if(req.file){
			 db.collection_uploaded_advertisements.insert(req.file, function(err, doc) {
//		        	console.log(doc);
		     });
		}
	    if(err){
	         res.json({error_code:1,err_desc:err});
	         return;
	    }
	     res.json({error_code:0,err_desc:null});
	});
});
app.get('/get_uploaded_advertisements_from_collection_uploaded_advertisements', function(req, res) {
//	db.collection_uploaded_advertisements.remove({});
	db.collection_uploaded_advertisements.find(function (err, docs) {
	    res.json(docs);
 });
});

app.post('/remove_logo_from_collection_uploaded_advertisements', function (req, res) {
//	console.log(req.body);
	  db.collection_uploaded_advertisements.remove({_id: db.ObjectId(req.body._id)}, function (err, doc) {
	    res.json(doc);
	    if(doc){
	    	fs.unlink('../client/uploads/upload_advertisements/' + req.body.file_name, function () {

	    	});
	    }
	  });
});

app.post('/remove_docs_from_collection_uploaded_advertisements', function (req, res) {
//	console.log(req.body);
	db.collection_uploaded_advertisements.remove({_id: db.ObjectId(req.body._id)}, function (err, doc) {
		res.json(doc);
		if(doc){
			fs.unlink('../client/uploads/upload_advertisements/' + req.body.file_name, function () {
				
			});
		}
	});
});

app.post('/remove_pdf_from_collection_uploaded_advertisements', function (req, res) {
//	console.log(req.body);
	db.collection_uploaded_advertisements.remove({_id: db.ObjectId(req.body._id)}, function (err, doc) {
		res.json(doc);
		if(doc){
			fs.unlink('../client/uploads/upload_advertisements/' + req.body.file_name, function () {
				
			});
		}
	});
});

}

})();