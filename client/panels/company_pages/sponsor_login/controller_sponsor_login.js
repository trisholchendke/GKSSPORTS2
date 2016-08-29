(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_sponsor_login', ['$scope','$http','$state',controller_sponsor_login])
;
function controller_sponsor_login($scope,$http,$state){
	$scope.login_sponsors = function(coming_object){
		$http.post('/login_user_from_collection_sponsor_login',coming_object)
		.success(function(response){
			if(response == null){
				alert('Invalid Username And Password');
			}
			if(response.user_name == $scope.login_sponsor.user_name && response.password == $scope.login_sponsor.password){
				alert('Login Sucessfull');
				$scope.tag_center_login = {};
				alert(JSON.stringify(response));
//				$scope.form.$setPristine();
//				$state.go("dashboard");
				$state.go('sponsor_dashboard', { 'login_object': response});
//				alert(JSON.stringify(response,null,2));
			}
		});
	}
	$scope.register_user = function(coming_object){
//		alert('registering now');
		$http.post('/register_user_into_collection_sponsor_login',coming_object)
		.success(function(response){
//			alert(response);
		});
	}
}

})();
