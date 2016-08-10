// All imports and variable init
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var bodyParser = require('body-parser')
var app = express()
var SessionMongoStore = require('connect-mongo')(expressSession)
var email = require('emailjs')
var process = require('process')
var csrf = require('csurf')
var busy = require('busy')

// Environment Variables
var yourEmail = process.env.NODE_MAIL
var yourPwd = process.env.NODE_MAIL_PASS
var sessionSecret = process.env.NODE_SECRET
var pathToMongoDb = process.env.DB_URL

// Email,MongoDB Setup
var host = 'http://localhost:3000/'
var yourSmtp = 'smtp.gmail.com'
var smtpServer = email.server.connect({
  user: yourEmail,
  password: yourPwd,
  host: yourSmtp,
  ssl: true
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

var busyCheck = busy()

// Middlewares Init
app.use(function (req, res, next) {
  if (busyCheck.blocked) {
    res.status(503).send("I'm busy right now, sorry.")
  } else {
    next()
  }
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  store: new SessionMongoStore({
    url: pathToMongoDb,
    autoRemove: 'native'
  })
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(csrf({cookie: true}))

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/mail', require('./routes/mail'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
