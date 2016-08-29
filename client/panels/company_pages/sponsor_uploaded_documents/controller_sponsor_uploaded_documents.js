(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_uploaded_documents', ['$scope','$http',controller_sponsor_uploaded_documents])
;
function controller_sponsor_uploaded_documents($scope,$http){
	var get_uploaded_documents_from_collection_uploaded_documents = function() {
		$http({
			  method: 'GET',
			  url: '/get_uploaded_documents_from_collection_uploaded_documents',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.uploaded_documents = response.data;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_uploaded_documents_from_collection_uploaded_documents();
	
	$scope.remove_pdf = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_pdf_from_collection_uploaded_documents',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_documents_from_collection_uploaded_documents();
		});
	}
	$scope.remove_docs = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_docs_from_collection_uploaded_documents',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_documents_from_collection_uploaded_documents();
		});
	}
	
	$scope.remove_images = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/remove_logo_from_collection_uploaded_documents',coming_object)
		.success(function(response){
//			alert(response);
			get_uploaded_documents_from_collection_uploaded_documents();
		});
	}
}

})();
