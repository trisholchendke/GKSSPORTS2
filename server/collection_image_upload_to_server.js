(function () {	'use strict';

module.exports = function(app, db){
	
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req,file, cb) {
        cb(null, '../client/uploads/upload_images');
    },
    filename: function (req,file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        file['logo_url'] = 'uploads/upload_images/' + file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
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

app.post('/upload_logos', function(req, res) {
	upload(req,res,function(err){
		req.file['logo_title'] = req.body.logo_title;
//		console.log(req.file);
		if(req.file){
			 db.collection_uploaded_logos.insert(req.file, function(err, doc) {
//				    console.log(doc);
//				    cb.json(doc);
		        });
		}
	    if(err){
	         res.json({error_code:1,err_desc:err});
	         return;
	    }
	     res.json({error_code:0,err_desc:null});
	});
});

app.get('/get_uploaded_logos_from_collection_uploaded_logos', function(req, res) {
//	db.collection_uploaded_logos.remove({});
	db.collection_uploaded_logos.find(function (err, docs) {
	    res.json(docs);
 });
});

app.post('/remove_logo_from_collection_uploaded_logos', function (req, res) {
//	  var id = req.params.id;
//	  var file_name = req.params.file_name;
//	  console.log(req.body.file_name);
//	  console.log(req.body);
	  db.collection_uploaded_logos.remove({_id: db.ObjectId(req.body._id)}, function (err, doc) {
	    res.json(doc);
//	    console.log(doc);
	    if(doc){
	    	fs.unlink('../client/uploads/upload_images/' + req.body.file_name, function () {
//	    	    console.log('write operation complete.');

	    	});
	    }
	  });
});

}

})();