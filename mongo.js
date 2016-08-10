// File for populating test data
// Changes with every iteration
var process = require('process')
// Connection URL
var url = process.env.DB_URL
var MongoClient = require('mongodb').MongoClient
// var assert = require('assert')
var bcrypt = require('bcrypt')
var co = require('co')
co(function * () {
  var db = yield MongoClient.connect(url)
  console.log('Connected correctly to server')

  var r = yield db.collection('users').findOne({user: 'demonshreder'})
  //   assert.equal(1, r.insertedCount)
  console.log(r)
  db.close()
}).catch(function (err) {
  console.log(err.stack)
})

co(function * () {
  var salt = yield bcrypt.genSalt(10, function (err, sexy) {
    if (err) {}
    return Promise.resolve(sexy)
    // console.log(sexy)
  })
  console.log(salt)
})
