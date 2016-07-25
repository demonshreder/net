var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost/mydb';

//routes
router.get('/super', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/sendtoken',
	passwordless.requestToken(
		// Simply accept every user
		function (user, delivery, callback) {
			// callback(null, user);
			MongoClient.connect(url, function (err, db) {
				assert.equal(null, err);
				db.collection('users').findOne({ email: user },
					function (err, document) {
						if (document == null) {
							var c = db.collection('users').insertOne({ email: user });
							assert.equal(1, c.insertedCount);
							callback(null, user)
						}
						else {
							callback(null, user);
						}
						db.close();
					});
			});
		}, { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', passwordless.logout(),
    function (req, res) {
        res.redirect('/');
	});
module.exports = router;
