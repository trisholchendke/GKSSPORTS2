(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_dashboard', ['$scope','$http','$stateParams','$state',controller_tag_center_dashboard])
;
function controller_tag_center_dashboard($scope,$http,$stateParams,$state){
	if($stateParams.login_object){
//		alert(JSON.stringify($stateParams.login_object.user_name));
		$scope.login_object = $stateParams.login_object;
	}
	
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
	  };
	  
	  $scope.logout_now = function(){
//		  alert('Logout User');
		  $scope.login_object = "";
		  $state.go('tag_center_login');
	  }
	  
	var get_data_from_collection_video = function() {
		$http({
			  method: 'GET',
			  url: '/get_video_details_from_collection_videos',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
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
	
	$scope.send_video_data = function(){
		$scope.video['tags'] = $scope.items;
		$http({
			  method: 'POST',
			  url: '/push_video_details_into_collection_videos',
			  data: $scope.video
			}).then(function successCallback(response) {
//				alert(response);
				get_data_from_collection_video();
				$scope.video = '';
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	}
	$scope.video_data = 
		[
			 {
				video_url:'../client/lib/assets/videos/mov_bbb.mp4',
				video_name:'Lorem ipsum dolor sit amet',
				video_description:'xyz',
			 },
			 {
				 video_url:'../client/lib/assets/videos/mov_bbb.mp4',
				 video_name:'Lorem ipsum dolor sit amet',
				 video_description:' abc',
			 },
			 {
				 video_url:'../client/lib/assets/videos/mov_bbb.mp4',
				 video_name:'Lorem ipsum dolor sit amet',
				 video_description:' efhh',
			 },
			 {
				 video_url:'../client/lib/assets/videos/mov_bbb.mp4',
				 video_name:'Lorem ipsum dolor sit amet',
				 video_description:' jejt',
			 },
			 {
				 video_url:'../client/lib/assets/videos/mov_bbb.mp4',
				 video_name:'pravin',
				 video_description:'et5rt',
			 },
		];
}

})();

