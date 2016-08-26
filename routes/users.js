var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var bcrypt = require('bcrypt')
var process = require('process')
// Connection URL
var url = process.env.DB_URL

// routes
router.get('/super', function (req, res, next) {
  // req.session.super = 'sexy'
  res.send(req.session)
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
              req.session.user = postUser
              res.send('SUCCESS')
            })
          })
        })
      } // Else end
    })
  })
})

router.post('/login', function (req, res) {
  /** login command
  * Checks if the username exists, then compares
  * the password and logs in if correct, else
  * returns an error
  */
  var postUser = req.body.username
  var postPass = req.body.password
  MongoClient.connect(url, function (err, db) { // DB Code Handling
    assert.equal(null, err)
    db.collection('users').findOne({ username: postUser }, function (err, userObj) {
      if (err) { res.send('Error occurred, try again') }
      if (userObj) { // Check if username exists
        bcrypt.compare(postPass, userObj.password, function (err, result) {
          if (err) { res.send('Error occurred, try again') }
          if (result) {
            // req.session.regenerate(function (err) {
            req.session.user = postUser
            if (err) { res.send('Error occurred, try again') }
            res.send('SUCCESS')
          // })
          } else {
            res.status(200).send('Password incorrect.')
          }
        })
      } else {
        res.status(200).send('Password incorrect.')
      } // Else end
    })
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) { res.redirect('/users/logout') }
    res.redirect('/')
  })
})

module.exports = router
