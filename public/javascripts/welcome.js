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
        this.screen.push({ text: text })
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
