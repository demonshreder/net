var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');
//MongoDB
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/mydb';

// routes
router.get('/', function (req, res, next) {
  if (req.user != null) {
    res.render('welcome', { user: req.user });
  }
  else {
    res.render('index', { user: req.user });
  }
});

// router.get('/super', function (req, res, next) {
//   // Use connect method to connect to the server
//   MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     // console.log("Connected succesfully to server");

//     db.close();
//     res.send('Connected successfully');
//   });
// });


module.exports = router;
