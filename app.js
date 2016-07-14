//All imports and variable init
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var passwordless = require('passwordless');
var TokenMongoStore = require('passwordless-mongostore');
var SessionMongoStore = require('connect-mongo')(expressSession);
var email = require("emailjs");
var process = require('process');
var csrf = require('csurf');
//Routes
var routes = require('./routes/index');
var users = require('./routes/users');
//Email,MongoDB Setup
var pathToMongoDb = 'mongodb://localhost/mydb';
var host = 'http://localhost:3000/';
var yourEmail = process.env.NODE_MAIL;
var yourPwd = process.env.NODE_MAIL_PASS;
var yourSmtp = 'smtp.gmail.com';
var smtpServer = email.server.connect({
  user: yourEmail,
  password: yourPwd,
  host: yourSmtp,
  ssl: true
});

// Setup of Passwordless
passwordless.init(new TokenMongoStore(pathToMongoDb));
passwordless.addDelivery(
  function (tokenToSend, uidToSend, recipient, callback) {
    // Send out token
    smtpServer.send({
      text: 'Hello!\nYou can now access your account here: '
      + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend),
      from: yourEmail,
      to: recipient,
      subject: 'Token for ' + host
    }, function (err, message) {
      if (err) {
        console.log(err);
      }
      callback(err);
    });
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Middlewares Init
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'Allahu akbar muhahaahhaa',
  saveUninitialized: false,
  resave: false,
  store: new SessionMongoStore({
    url:pathToMongoDb,
    autoRemove:'native'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/' }));
app.use(csrf({cookie:true}));

//Routes
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
