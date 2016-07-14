// File for populating test data
// Changes with every iteration
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mydb';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('mail').insertOne({
        email: 'sskamalavelan@gmail.com',
        mail: [{
            read: false,
            sender: 'allah@akbar.com',
            subject: 'Allahu Akabar',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in arcu eget lacus lacinia suscipit quis at sem. Vivamus ornare risus ut lobortis hendrerit. Etiam ipsum dolor, pharetra ac hendrerit sed, sodales sit amet dui. Integer fermentum ligula enim, non maximus lectus porttitor ut. Donec mauris nisi, eleifend rhoncus orci eget, malesuada pretium dolor. Cras est dolor, lacinia ac turpis non, tempor dignissim purus. Mauris luctus nunc ut consectetur tempor. Nam non congue nunc. Quisque nec posuere augue, eu lacinia ipsum. Maecenas ipsum tellus, vehicula eu mauris quis, sagittis accumsan ligula. Suspendisse eget sollicitudin nisl. Curabitur placerat eleifend fermentum. Nunc felis ex, iaculis non arcu eget, eleifend bibendum nisi. Phasellus vestibulum dictum lobortis. Cras vehicula vestibulum viverra. Donec vel arcu ut eros pharetra tempus.',
            time: new Date(),

        }, {
                read: true,
                sender: 'rajini@superstar.com',
                subject: 'KABALI DAAA',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla, lectus quis pulvinar blandit, nibh mi porta lacus, ut scelerisque tellus urna ut risus. Integer consectetur enim condimentum dolor auctor rhoncus. Nullam non tempor velit, et pulvinar turpis. Proin cursus a arcu ut sodales. Aenean vel pharetra diam, eget finibus nunc. Proin iaculis mauris sapien, quis rhoncus felis mollis in. Fusce ut dui vel est facilisis egestas. Cras a eros semper felis euismod venenatis nec sit amet orci. Sed vulputate odio id tempor commodo. Phasellus ac purus nibh. Aliquam posuere lacus ut sem sodales luctus. Mauris ultricies justo vestibulum erat luctus bibendum. Aenean vestibulum venenatis ipsum, eu sollicitudin sem dignissim ut.",
                time: new Date()
            },
            {
                read: false,
                sender: 'node@js.com',
                subject: 'Async I/O bitches',
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut venenatis libero. Fusce metus sem, semper vitae dolor at, fermentum mollis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum laoreet quam, id facilisis tellus imperdiet eget. Pellentesque quis lorem tellus. Phasellus sodales felis posuere odio tristique, ac lacinia orci pretium. Duis non tempor velit. Etiam sit amet purus ac leo faucibus placerat. Praesent pretium venenatis ligula, sit amet sollicitudin nisi sodales sed. Suspendisse non ligula ligula. Quisque diam lectus, iaculis faucibus consequat vel, volutpat cursus orci. Curabitur dictum ac arcu vel ultrices. Praesent non nunc rutrum, egestas velit iaculis, mattis lorem.",
                time: new Date()
            }
        ]
    }, function (err, documents) {
        console.log(documents);
        db.close();
    });


});