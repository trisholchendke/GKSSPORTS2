(function () {	'use strict';

module.exports = function(app, db){
app
.get('/get_user_from_collection_sponsor_login',get_user_from_collection_sponsor_login)
.post('/register_user_into_collection_sponsor_login',register_user_into_collection_sponsor_login)
.post('/login_user_from_collection_sponsor_login',login_user_from_collection_sponsor_login)
.post('/change_flag_status_of_video_is_approved_into_collection_video',change_flag_status_of_video_is_approved_into_collection_video)
.post('/change_flag_status_of_video_is_disapproved_into_collection_video',change_flag_status_of_video_is_disapproved_into_collection_video)
;
function register_user_into_collection_sponsor_login(req,res){
	req.body['video_status'] = 0;
	 	db.collection_sponsor_login.insert(req.body, function(err, doc) {
	 });
}

function login_user_from_collection_sponsor_login(req,res){
	db.collection_sponsor_login.findOne(
			{
				user_name: req.body.user_name,
				password:req.body.password
			},findOne_item
	);
	function findOne_item(err,doc){
		res.json(doc);
	}
}

function get_user_from_collection_sponsor_login(req,res){
//	db.collection_sponsor_login.remove({})
	db.collection_sponsor_login.find(function (err, docs) {
	    res.json(docs);
	});
}

function change_flag_status_of_video_is_approved_into_collection_video(req,res){
	console.log(req.body.video_approved_id);
	db.collection_videos.findAndModify({
		query : {
			_id: db.ObjectId(req.body.video_approved_id),
		},
		update : {
			$set : {
				video_status: 1, 
			}
		},
		new: true,
	},
	callback_findAndModify 
	);
	function callback_findAndModify(error, docs){
		console.log(docs);
		res.json(docs);
	}
}
function change_flag_status_of_video_is_disapproved_into_collection_video(req,res){
//	console.log(req.body.video_disapproved_id);
	db.collection_videos.findAndModify({
		query : {
			_id: db.ObjectId(req.body.video_disapproved_id),
		},
		update : {
			$set : {
				video_status: 2, 
			}
		},
		new: true,
	},
	callback_findAndModify 
	);
	function callback_findAndModify(error, docs){
		console.log(docs);
		res.json(docs);
	}
}

}

})();