(function () {	'use strict';

module.exports = function(app, db){
app
.post('/register_user_into_collection_tag_center_login',register_user_into_collection_tag_center_login)
.post('/login_user_from_collection_tag_center_login',login_user_from_collection_tag_center_login)
.get('/get_login_user_from_collection_tag_center_login',get_login_user_from_collection_tag_center_login)
;
function register_user_into_collection_tag_center_login(req,res){
	 db.collection_tag_center_login.insert(req.body, function(err, doc) {
		    res.json(doc);
//		    console.log(doc);
		  });
}
function login_user_from_collection_tag_center_login(req,res){
//	console.log(req.body);
	db.collection_tag_center_login.findOne(
			{
				user_name: req.body.user_name,
				password:req.body.password
			},findOne_item
	);
	function findOne_item(err,doc){
//		console.log(doc);
		res.json(doc);
	}
}
function get_login_user_from_collection_tag_center_login(req,res){
//	console.log('hi');
	
}

}

})();