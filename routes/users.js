var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var bcrypt = require('bcrypt')
var process = require('process')
// Connection URL
var url = process.env.DB_URL

// routes
router.post('/super', function (req, res, next) {
  res.send(req.body._csrf)
})
router.post('/register', function (req, res, next) {
  /** Register command
   * Checks if the username exists, if not adds it
   * with the specific password
   */
  var postUser = req.body.username
  var postPass = req.body.password
  // res.status(200).send(username + password)
  MongoClient.connect(url, function (err, db) { // DB Code Handling
    assert.equal(null, err)
    db.collection('users').findOne({ username: postUser }, function (err, userObj) {
      if (err) { res.send('Error occurred, try again') }
      if (userObj) { // Check if username exists
        // req.session.regenerate(function () {
        res.status(200).send('Username already exists')
      // })
      } else {
        bcrypt.genSalt(function (err, salt) {
          // Bcrypt hashing of the password
          if (err) { res.status(500).send('Error occurred, try again') }
          bcrypt.hash(postPass, salt, function (err, hash) {
            if (err) { res.status(500).send('Error occurred, try again') }
            db.collection('users').insertOne({username: postUser, password: hash}, function () {
              res.send('User created successfully')
            })
          })
        })
      } // Else end
    })
  })
})

router.post('/login', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err)
    var userObj = db.users.findOne({ username: username })

    if (userObj) {
      req.session.regenerate(function () {
        req.session.user = userObj.username
        res.send('authenticated')
      })
    } else {
      res.send('failed')
    }
  })
})

router.get('/logout',
  function (req, res) {
    res.redirect('/')
  })

module.exports = router
