(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_dashboard', ['$scope','$http','$stateParams',controller_sponsor_dashboard])
;
function controller_sponsor_dashboard($scope,$http,$stateParams){
	if($stateParams.login_object){
//		alert($stateParams.login_object._id);
		$scope.login_object = $stateParams.login_object;
		
		$scope.cartItems = [];
		$scope.cartItems1 = [];
		
	    $scope.addToCart = function(item) {
	    	var new_item = 
	    	{
	    			login_sponsor_id:$stateParams.login_object._id,
	    			video_approved_id:item._id
	    	}
	      $scope.cartItems.push(item);
//	      alert('video is approved');
	      $http({
			  method: 'POST',
			  url: '/change_flag_status_of_video_is_approved_into_collection_video',
			  data:new_item,
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.sponsor_data = response.data;
				 get_data_from_collection_video()
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	    };
	    
	    $scope.addToCart1 = function(item) {
	    	$scope.cartItems1.push(item);
//	    	alert('video is disapproved');
	    	var new_item = 
	    	{
	    			login_sponsor_id:$stateParams.login_object._id,
	    			video_disapproved_id:item._id
	    	}
	      $scope.cartItems.push(item);
//	      alert('video is approved');
	      $http({
			  method: 'POST',
			  url: '/change_flag_status_of_video_is_disapproved_into_collection_video',
			  data:new_item,
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.sponsor_data = response.data;
				 get_data_from_collection_video();
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	    };
	    
	    $scope.doesExist = function(item) {
	      return $scope.cartItems.indexOf(item) !== -1;
	    };
	    
	    $scope.doesExist1 = function(item) {
	    	return $scope.cartItems1.indexOf(item) !== -1;
	    };
	}
	var get_data_from_collection_video = function() {
		$http({
			  method: 'GET',
			  url: '/get_video_details_from_collection_videos',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data,null,2));
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
	
	var get_user_from_collection_sponsor_login = function() {
		$http({
			  method: 'GET',
			  url: '/get_user_from_collection_sponsor_login',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.sponsor_data = response.data;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_user_from_collection_sponsor_login();
	
}

})();
