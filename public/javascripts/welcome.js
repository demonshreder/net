var exampleData = {
    name: 'Vue.js'
}

var exampleVM = new Vue({
    el: '#play',
    data: exampleData
})


var mailStore = [];
//Mail functionality
function mail() {
    ajax.send('/mail',function (data) {
            mailStore = data;
        },
        'GET');
}

function display() {
    console.log(mailStore);
}