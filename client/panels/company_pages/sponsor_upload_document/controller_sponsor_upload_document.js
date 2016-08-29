(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_upload_document', ['$scope','Upload','$window','$http','$state',controller_sponsor_upload_document])
;
function controller_sponsor_upload_document($scope,Upload,$window,$http,$state){
	$scope.reset_form = function(){
		$scope.documentt_title = '';
		$scope.up.upload_form.$setPristine();
	}
	
	var get_uploaded_documents_from_collection_uploaded_documents = function() {
		$http({
			  method: 'GET',
			  url: '/get_uploaded_documents_from_collection_uploaded_documents',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
//				 $scope.uploaded_advertise = response.data;
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_uploaded_documents_from_collection_uploaded_documents();
	
    this.submit = function(coming_object){ //function to call on form submit
//    	alert('hi');
        if (this.upload_form.file.$valid && this.file) { //check if from is valid
            this.upload(this.file,this.document_title); //call upload function
        }
    }
    
    this.upload = function (file,document_title) {
//    	alert(JSON.stringify(document_title));
        Upload.upload({
            url: 'http://localhost:3000/upload_documents', //webAPI exposed to upload the file
            data:{file:file,document_title:document_title} //pass file as data, should be user ng-model
        }).then(function (resp) {
        	get_uploaded_documents_from_collection_uploaded_documents();
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $state.go('sponsor_uploaded_documents');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
//        	alert(JSON.stringify(resp.status));
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            this.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}

})();
