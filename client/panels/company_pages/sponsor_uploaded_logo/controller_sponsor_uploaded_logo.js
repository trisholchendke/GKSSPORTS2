
(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_logo',['$scope','Upload','$window','$http','$state',controller_sponsor_uploaded_logo]);
function controller_sponsor_uploaded_logo($scope,Upload,$window,$http,$state){
	var get_uploaded_logos_from_collection_uploaded_logos = function() {
		$http({
			  method: 'GET',
			  url: '/get_uploaded_logos_from_collection_uploaded_logos',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data.length));
				 $scope.uploaded_logos = response.data;
//				 if(response.data.length == 0){
//					 $state.go('sponsor_upload_logo');
//				 }
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_uploaded_logos_from_collection_uploaded_logos();
	
	$scope.remove_image = function(coming_object){
//		alert(JSON.stringify(coming_object.file_name));
		$http.post('/remove_logo_from_collection_uploaded_logos',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_logos_from_collection_uploaded_logos();
		});
	}
	
}

})();