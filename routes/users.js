var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

/* GET users listing. */
router.get('/super', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sendtoken', 
	passwordless.requestToken(
		// Simply accept every user
		function(user, delivery, callback) {
			callback(null, user);
			// usually you would want something like:
			// User.find({email: user}, callback(ret) {
			// 		if(ret)
			// 			callback(null, ret.id)
			// 		else
			// 			callback(null, null)
			// })
		},{ failureRedirect: '/' }),
	function(req, res) {
  		res.redirect('/');
});

router.get('/logout', passwordless.logout(),
    function(req, res) {
        res.redirect('/');
});
module.exports = router;
