(function () {	'use strict';

angular
.module('routerApp')
.controller('controller_session_demo', ['$scope',controller_session_demo])
;
function controller_session_demo($scope){
	$(function() {
        $("#post-name").click(function() {
          postName();
        });
        $("#logout").click(function() {
          logout();
        });
        
        getName();
      });
	
	$scope.getName = function(){
		 $.get("/name/", function (response) {
	          var name = response['name'];
	          updateUI(name);
	     });
	}
	$scope.getName();
      
      function postName() {
        var name = $("#user-name").val();

        // Clear the text field
        $("#user-name").val("");

        $.ajax({
          url: "/name",
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({ "name": name }),
          success: function (response) {
            var name = response['name'];
            updateUI(name);
          }
        });
      }

      function logout() {
        $.get( "/logout", function( data ) {
          updateUI("");
        });
      }
      
      function updateUI(name) {
        if(name !== '') {
          $("#name").html(name);
          $("#name-display").show();
          $("#name-form").hide();
        }
        else {
          $("#name-display").hide();
          $("#name-form").show();
        }
      }
}

})();
