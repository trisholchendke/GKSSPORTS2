
(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_upload_logo',['$scope','Upload','$window','$http','$state',controller_sponsor_upload_logo]);
function controller_sponsor_upload_logo($scope,Upload,$window,$http,$state){
	$scope.reset_form = function(){
		$scope.logo_title = '';
		$scope.up.upload_form.$setPristine();
	}
	
	var get_uploaded_logos_from_collection_uploaded_logos = function() {
		$http({
			  method: 'GET',
			  url: '/get_uploaded_logos_from_collection_uploaded_logos',
			}).then(function successCallback(response) {
//				alert(JSON.stringify(response.data));
				 $scope.uploaded_logos = response.data;
				 
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	};
	get_uploaded_logos_from_collection_uploaded_logos();
	
    this.submit = function(coming_object){ //function to call on form submit
        if (this.upload_form.file.$valid && this.file) { //check if from is valid
            this.upload(this.file,this.logo_title); //call upload function
        }
    }
    
    this.upload = function (file,logo_title) {
//    	alert(JSON.stringify(logo));
        Upload.upload({
            url: 'http://localhost:3000/upload_logos',
            data:{file:file,logo_title:logo_title} ,
        }).then(function (resp) {
        	get_uploaded_logos_from_collection_uploaded_logos();
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $state.go('sponsor_uploaded_logo');
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