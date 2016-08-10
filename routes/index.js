var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var process = require('process')
// Connection URL
var url = process.env.DB_URL

// routes
router.get('/', function (req, res, next) {
  if (req.user != null) {
    res.render('welcome', { user: req.user })
  }else {
    res.render('home', { user: req.user, csrfToken: req.csrfToken() })
  }
})

// router.get('/super', function (req, res, next) {
//   // Use connect method to connect to the server
//   MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err)
//     // console.log("Connected succesfully to server")

//     db.close()
//     res.send('Connected successfully')
//   })
// })

module.exports = router
