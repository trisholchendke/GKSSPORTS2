(function () {	'use strict';

module.exports = function(app, db){
	
	app.get('/name', getName);
	app.post('/name', setName);
	app.get('/logout', logout);

	function getName(req, res) {
		  if (req.session.name) {
		    return res.json({ name: req.session.name });
		  }
		  else {
		    return res.json({ name: '' });
		  }
	}

	function setName(req, res) {
	  if(!req.body.hasOwnProperty('name')) {
	    res.statusCode = 400;
	    return res.json({ error: 'Invalid message' });
	  }
	  else {
	    req.session.name = req.body.name;
	    return res.json({ name: req.body.name });
	  }
	}

	function logout(req, res) {
	  req.session = null;
	  return res.json({});
	}


}

})();


