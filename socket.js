/**
 * Module for socket.io commands handling
 */
module.exports = function (socket) {
  socket.emit('cool', { some: 'data' })
  socket.on('super', function (data) {
    console.log(data)
  })
}
