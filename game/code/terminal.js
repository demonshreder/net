/**
 * Module for socket.io commands handling
 */
// Changes with every iteration
var process = require('process')
// Connection URL
var url = process.env.DB_URL
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

module.exports = function (socket) {
  function emission (socket, data) {
    data = data.trim()
    data = data.split(' ')
    switch (data[0]) {
      case 'touch':
        socket.emit('screen', 'touched')
        MongoClient.connect(url, function (err, db) {
          assert.equal(null, err)
          // Insert a single document
          db.collection('computer').updateOne({username: socket.request.session.user}, {$set :{filename: } }, function (err, r) {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            db.close()
          })
        })
        break
    }
  }
  socket.on('terminal', function (data) {
    // socket.emit('screen', 'touched')
    emission(socket, data)
  })
}
