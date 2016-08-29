(function () {	'use strict';

var ngcart_template_path= 'client/lib/templates_modal/';

angular
.module('routerApp')
.controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log','Session_login_new_user', ModalDemoCtrl])
.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', ModalInstanceCtrl]);
function ModalDemoCtrl($scope, $uibModal, $log,Session_login_new_user) {
	$scope.cart_record;
//	alert(JSON.stringify($scope.cart_record));
//	if (Session_login_new_user.data) {
//		alert(JSON.stringify(Session_login_new_user));
//	}	
//	else if (Session_login_new_user = {}){
////		alert('User Must Login');
//	}else {
//	}
//	$scope.animationsEnabled = true;
	$scope.open = function() {
		var modalInstance = $uibModal.open( {
			animation : $scope.animationsEnabled,
			templateUrl : ngcart_template_path + 'myModalContent.ng.html',
			controller : 'ModalInstanceCtrl',
			size : 'lg',
			resolve : {
			items : function() {
			return $scope.cart_record = Session_login_new_user.data;
		}
		}
		});
		
		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	
	$scope.toggleAnimation = function(){
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};
	
}
function ModalInstanceCtrl($scope, $uibModalInstance,cart_record) {

	$scope.cart_record = cart_record;

	$scope.ok = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.get_cart_total_price = function(){
   		var cart_total_price = 0;
   		angular.forEach($scope.cart_record.cart_object, function(each_cart_item){
   			cart_total_price += Number(JSON.stringify(each_cart_item.price,null,2));
   		});
   		return cart_total_price;
   	};
   	$scope.remove_item = function(coming_object){
//   		alert(JSON.stringify(coming_object));
   		coming_object.show_add_item_button = true;
   		var index = $scope.cart_record.cart_object.indexOf(coming_object);
   		if (index > -1) {
   			$scope.cart_record.cart_object.splice(index, 1);
   		}
	};
}

})();