var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost/mydb';

//routes
router.get('/super', function (req, res, next) {
	res.send('respond with a resource');
});
router.get('/register', function (req, res, next) {
	
	res.send('respond with a resource');
});

router.get('/logout',
    function (req, res) {
        res.redirect('/');
	});

module.exports = router;
