// File for populating test data
// Changes with every iteration
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mydb';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('mail').insertMany([{

        sender: 'rajini@kabali.com',
        receiver: 'sskamalavelan@gmail.com',
        time : Date.now(),
        read: false,
        subject: 'KABALI DAAA!!!',
        body: 'Kabali is an upcoming 2016 Indian Tamil-language gangster-drama film written and directed by Pa. Ranjith.[4] The film stars Rajinikanth as the title character, whilst Taiwanese actor Winston Chao, Radhika Apte, Dhansika, Dinesh Ravi, Kalaiyarasan, and John Vijay star in other pivotal roles. Principal photography for the film began on 21 August 2015 in Chennai. While filming mostly occurred in Malaysia, smaller scenes were shot in Bangkok and Hong Kong.[5][6][7][8] The film is slated for release on 22 July 2016.[9]'

    }, {
            sender: 'node@js.org',
            receiver: 'sskamalavelan@gmail.com',
            time : Date.now(),
            read: true,
            subject: "Async IO bitches",
            body: 'In software development, Node.js is an open-source, cross-platform runtime environment for developing server-side Web applications. Although Node.js is not a JavaScript framework,[3] many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript. The runtime environment interprets JavaScript using Googles V8 JavaScript engine.Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in Web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).[4]The Node.js distributed development project, governed by the Node.js Foundation,[5] is facilitated by the Linux Foundations Collaborative Projects program.[6]'
        }, {
            sender: 'games@browser.com',
            receiver: 'sskamalavelan@gmail.com',
            time : Date.now(),
            read: false,
            subject: "HTML5 FTW!!!",
            body: 'Browser games are often free-to-play and do not require any client software to be installed apart from a web browser or browser plug-in. In some cases a game may be free, but charge for extra in-game features. Multiplayer browser games have an additional focus on social interaction, either between several players or on a massive scale. Due to the accessibility of browser games, they are often played in more frequent, shorter sessions compared to traditional computer games.[4] Since browser games run isolated from hardware in a web browser, they can run on many different operating systems without having to be ported to each platform.[5]'
        }],
        function (err, data) {
            console.log(data);
           
        }
    );
     db.close();



});