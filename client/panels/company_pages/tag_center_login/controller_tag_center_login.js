(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_tag_center_login', ['$scope','$http','$state',controller_tag_center_login])
;
function controller_tag_center_login($scope,$http,$state){
	$scope.register_user = function(coming_object){
//		alert(JSON.stringify(coming_object,null,2));
		$http.post('/register_user_into_collection_tag_center_login',coming_object)
		.success(function(response){
			alert(response);
		});
	}
	$scope.login_now = function(coming_object){
//		alert(JSON.stringify(coming_object));
		$http.post('/login_user_from_collection_tag_center_login',coming_object)
		.success(function(response){
			if(response == null){
				alert('Invalid Username And Password');
			}
			if(response.user_name == $scope.tag_center_login.user_name && response.password == $scope.tag_center_login.password){
				alert('Login Sucessfull');
				$scope.tag_center_login = {};
//				$scope.form.$setPristine();
//				alert(JSON.stringify(response));
//				$state.go("tag_center_dashboard");
				$state.go('tag_center_dashboard', { 'login_object': response});
//				alert(JSON.stringify(response,null,2));
			}
		});
	}
	
//	var get_login_user_from_collection_tag_center_login = function() {
//		$http({
//			  method: 'GET',
//			  url: '/get_login_user_from_collection_tag_center_login',
//			}).then(function successCallback(response) {
//			  }, function errorCallback(response) {
//			  });
//	};
//	get_login_user_from_collection_tag_center_login();
}

})();
