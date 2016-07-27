 var about = [
                {text:"Live in "},
                {text:""},
                {text:""},
                {text:""},
                {text:""},
                {text:""},

    ];
    var help = [
                {text:"---------------------------------------------------------------------"},
                {text:"1337 Protocol Help"},
                {text:"---------------------------------------------------------------------"},
                {text:"about - About the game "},
                {text:"login <username> - Wait for password prompt"},
                {text:"register <username> - Wait for password prompt"},
                {text:"---------------------------------------------------------------------"},
    ];
    var MOTD =  [
        {text:"====================================================================="},
        {text:"Welcome to 1337 Protocol, a cyberwarfare MMORPG."},
        {text:"Type help to learn more."},
        {text:"====================================================================="}
    ];
    var exampleVM2 = new Vue({
    el: '#term',
    data: {
        screen:MOTD,
        message: ""
    },
    methods: {
        command: function () {
            var text = this.message.trim();
              text = text.split(" ");
             if (text) {
               switch (text[0]){
                case 'help':
                      help.forEach(function(element) {
                      this.screen.push({text:element.text});
                      }, this);
                      break;
                case 'about':
                      about.forEach(function(element) {
                      this.screen.push({text:element.text});
                      }, this);
                      break;
                case 'register':

                      this.screen.push({text:"Authentication denied."})
                      break;
                case 'login':

                      this.screen.push({text:"Authentication denied."})
                      break;
                default:
                      this.screen.push({text:'Type help for some shit'})
            }
                this.message = ''
            var objDiv = document.getElementById("screen");
            objDiv.scrollTop = objDiv.scrollHeight;
            }
        }
    }
    });
