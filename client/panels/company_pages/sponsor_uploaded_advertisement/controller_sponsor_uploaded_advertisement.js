(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_advertisement', ['$scope','$http',controller_sponsor_uploaded_advertisement])
;
function controller_sponsor_uploaded_advertisement($scope,$http){
	var get_uploaded_advertisements_from_collection_uploaded_advertisements = function() {
		$http({
			  method: 'GET',
			  url: '/get_uploaded_advertisements_from_collection_uploaded_advertisements',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.uploaded_advertisement = response.data;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_uploaded_advertisements_from_collection_uploaded_advertisements();
	
	$scope.remove_pdf = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_pdf_from_collection_uploaded_advertisements',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_advertisements_from_collection_uploaded_advertisements();
		});
	}
	$scope.remove_docs = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_docs_from_collection_uploaded_advertisements',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_advertisements_from_collection_uploaded_advertisements();
		});
	}
	
	$scope.remove_images = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_logo_from_collection_uploaded_advertisements',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_advertisements_from_collection_uploaded_advertisements();
		});
	}
}

})();
