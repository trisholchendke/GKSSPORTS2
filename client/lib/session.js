(function () {	'use strict';

angular
.module('routerApp')
.run(function(Session_login_new_user) {}) 
.run(function(Session_admin) {}) 
.factory('Session_login_new_user', ['$http', Session_login_new_user])
.factory('Session_admin', ['$http', Session_admin])
;
function Session_login_new_user($http) {
	var Session = {
			data: {},
			saveSession: function() { /* save session data to db */ },
			
			updateSession: function(input_session_data) { 
				return Session.data = input_session_data;
			}
	};
	Session.updateSession();
	return Session; 
}
function Session_admin($http) {
	var Session = {
			data: {},
			saveSession: function() { /* save session data to db */ },
			
			updateSession: function(input_session_data) { 
				return Session.data = input_session_data;
			}
	};
	Session.updateSession();
	return Session; 
}

})();
