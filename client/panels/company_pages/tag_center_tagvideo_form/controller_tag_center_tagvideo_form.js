(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_tagvideo_form', ['$scope','$stateParams','$http','$state',controller_tag_center_tagvideo_form])
;
function controller_tag_center_tagvideo_form($scope,$stateParams,$http,$state){
//	angular.element(document).ready(function () {
//		 $("#medium").tags({
//	          suggestions: ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india"],
//	          tagData: ["juliett", "kilo"]
//	        });
//    });
	
	$scope.items = [];

	  $scope.itemsToAdd = [{
	    tags: '',
	  }];

	  $scope.add = function(itemToAdd) {

	    var index = $scope.itemsToAdd.indexOf(itemToAdd);

	    $scope.itemsToAdd.splice(index, 1);

	    $scope.items.push(angular.copy(itemToAdd))
	  }

	  $scope.addNew = function() {

	    $scope.itemsToAdd.push({
	      tags: '',
	    })
	  }
	  var get_data_from_collection_video = function() {
			$http({
				  method: 'GET',
				  url: '/get_video_details_from_collection_videos',
				}).then(function successCallback(response) {
//					alert(JSON.stringify(response.data));
					 $scope.video_data = response.data;
					    $scope.contact = "";
				    // this callback will be called asynchronously
				    // when the response is available
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
		};

		get_data_from_collection_video();
	  $scope.push_anoter_tags = function(){
		  alert(JSON.stringify($scope.items,null,2));
		  var new_item = 
			  {
				  video_id:$stateParams.video_object._id,
				  tags:$scope.items,
			  }
			$http({
				  method: 'POST',
				  url: '/push_anoter_tags_into_collection_videos',
				  data: new_item
				}).then(function successCallback(response) {
					get_data_from_collection_video();
				  }, function errorCallback(response) {
				  });
		}
	
	if($stateParams.video_object){
//		alert(JSON.stringify($stateParams.video_object));
		$scope.video_name = $stateParams.video_object.video_name;
		$scope.video_description = $stateParams.video_object.video_description;
		$scope.video_tags = $stateParams.video_object.tags;
	}else{
//		alert("NO Videos");
		$state.go('tag_center_dashboard');
//		$state.go('dashboard');
	}
	
//	alert($stateParams.video_name);
	
//	alert($stateParams.video_name);
//	alert($stateParams.video_description);
//	console.log($stateParams);
}

})();
