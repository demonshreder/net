/**
 * Module for socket.io commands handling
 */
module.exports = function (socket) {
  socket.on('terminal', function (data) {
    // socket.request.session
    socket.emit('screen', socket.request.session)

    // console.log(socket.request)
  })
}
