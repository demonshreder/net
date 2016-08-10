var express = require('express')
var router = express.Router()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var process = require('process')
// Connection URL
var url = process.env.DB_URL

router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err)
    db.collection('mail').find({ receiver: req.user }).toArray(function (err, data) {
      res.send(data)
      db.close()
    })
  })
// res.send(req.user)
})

module.exports = router
