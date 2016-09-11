// var socket = io.connect('http://localhost:3000')
// socket.on('news', function (data) {
//   console.log(data)
//   socket.emit('connection', { my: 'data' })
// })
// var socket = io.connect('http://localhost:1337')
var socket = io()
socket.on('screen', function (data) {
  exampleVM2.screen.push({text: data})
})
var exampleVM2 = new Vue({
  el: '#term',
  data: {
    screen: [{text: ''}],
    message: ''
  },
  methods: {
    command: function () {
      var text = this.message.trim()
      if (text) {
        socket.emit('terminal', text)
        this.message = ''
        var objDiv = document.getElementById('screen')
        objDiv.scrollTop = objDiv.scrollHeight
      }
    }
  }
})

var mailStore = []
// Mail functionality
function mail () {
  ajax.send('/mail', function (data) {
    mailStore = data
  },
    'GET')
}

function display () {
  console.log(mailStore)
}
