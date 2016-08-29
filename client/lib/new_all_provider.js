(function () {	'use strict';

angular
.module('routerApp')
.provider("tutorials_chapter",[tutorials_chapter])
;
function tutorials_chapter() {
	  var type;
	  return {
	    setType: function (json_variable) {
	      type = json_variable;
	    },
	    $get: function () {
	      return {
	    	  chapter: type
	      };
	    }
	  };
}

})();

