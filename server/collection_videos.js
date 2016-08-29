(function () {	'use strict';

module.exports = function(app, db){
	
app
.post('/push_video_details_into_collection_videos',push_video_details_into_collection_videos)
.get('/get_video_details_from_collection_videos',get_video_details_from_collection_videos)
.post('/push_anoter_tags_into_collection_videos',push_anoter_tags_into_collection_videos)
;
function push_video_details_into_collection_videos(req,res){
	req.body['video_status'] = 0;
	  db.collection_videos.insert(req.body, function(err, doc) {
	    res.json(doc);
//	    console.log(doc);
	  });
}

function get_video_details_from_collection_videos(req,res){
//db.collection_videos.remove({});
	 db.collection_videos.find(function (err, docs) {
//		    console.log(docs);
		    res.json(docs);
	 });
}

function push_anoter_tags_into_collection_videos(req,res){
//	console.log(req.body);
		req.body.tags.forEach(function(item){
			db.collection_videos.findAndModify({
				query: 
				{
					_id: db.ObjectId(req.body.video_id),
				},
				update: 
				{
					$push: {tags: item},
				},
				
				safe:true, 
				multi:false,
				new: true,
			},findAndModify 
			);
			function findAndModify(err,doc)
			{
//				    res.json(doc)
//				    console.log(doc)
			}
			
		});
}

}

})();