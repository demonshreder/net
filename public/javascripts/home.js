var about = [
  {text: 'Live in '},
  {text: ''},
  {text: ''},
  {text: ''},
  {text: ''},
  {text: ''}

]
var help = [
  {text: '---------------------------------------------------------------------'},
  {text: '1337 Protocol Help'},
  {text: '---------------------------------------------------------------------'},
  {text: 'about - About the game '},
  {text: 'login <username> - Wait for password prompt'},
  {text: 'register <username> - Wait for password prompt'},
  {text: '---------------------------------------------------------------------'}
]
var MOTD = [
  {text: '====================================================================='},
  {text: 'Welcome to 1337 Protocol, a cyberwarfare MMORPG.'},
  {text: 'Type help to learn more.'},
  {text: '====================================================================='}
]
var consoleVM = new Vue({
  el: '#term',
  data: {
    screen: MOTD,
    message: '',
    inputType: 'text',
    flowStatus: 'normal',
    postParam: []
  },
  methods: {
    command: function () {
      var text = this.message.trim()
      text = text.split(' ')

      if (text && consoleVM.flowStatus === 'normal') {
        switch (text[0]) {
          case 'help':
            help.forEach(function (element) {
              this.screen.push({text: element.text})
            }, this)
            break
          case 'about':
            about.forEach(function (element) {
              this.screen.push({text: element.text})
            }, this)
            break
          case 'register':
            if (text[1] != null) {
              consoleVM.postParam.push(text[1])
              consoleVM.flowStatus = 'register'
              consoleVM.inputType = 'password'
              consoleVM.screen.push({text: 'Please enter password for ' + text[1]})
            } else { this.screen.push({text: 'Syntax for register is "register <username>"'}) }
            break
          case 'login':
            if (text[1] != null) {
              consoleVM.postParam.push(text[1])
              consoleVM.flowStatus = 'login'
              consoleVM.inputType = 'password'
              consoleVM.screen.push({text: 'Please enter password for ' + text[1]})
            } else { this.screen.push({text: 'Syntax for login is "login <username>"'}) }
            break
          default:
            this.screen.push({text: 'Type help for some shit'})
        }
      } else {
        switch (consoleVM.flowStatus) {
          case 'register':
            consoleVM.flowStatus = 'normal'
            consoleVM.inputType = 'text'
            ajax.post('/users/register', {'username': consoleVM.postParam[0], 'password': text[0]}, function (data) {
              consoleVM.postParam.pop(0)
              if (data === 'SUCCESS') { window.location = '/' } else { consoleVM.screen.push({ text: String(data) }) }
            })
            break
          case 'login':
            consoleVM.flowStatus = 'normal'
            consoleVM.inputType = 'text'
            ajax.post('/users/login', {'username': consoleVM.postParam[0], 'password': text[0]}, function (data) {
              consoleVM.postParam.pop(0)
              if (data === 'SUCCESS') { window.location = '/' } else { consoleVM.screen.push({ text: String(data) }) }
            })
        }
      }
      this.message = ''
      var objDiv = document.getElementById('screen')
      objDiv.scrollTop = objDiv.scrollHeight + 100
    }
  }
})
