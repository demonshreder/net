#!/usr/bin/env node

/**
 * Module dependencies.
 */
// All imports and variable init
var debug = require('debug')('net:server')
var http = require('http')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var expressSession = require('express-session')
var bodyParser = require('body-parser')
var app = express()
var email = require('emailjs')
var process = require('process')
var csrf = require('csurf')
var busy = require('busy')
var assert = require('assert')
var SessionMongoStore = require('connect-mongo')(expressSession)
var cookieParser = require('cookie-parser')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// var session = expressSession(sessionVar)

// var server = http.createServer(app)
// var io = require('socket.io')(server)
// io.on('connection', function (socket) {
//   console.log('a user connected')
// })

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

var sessionVar = {
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
  maxAge: 120960000,
  store: new SessionMongoStore({
    url: pathToMongoDb,
    autoRemove: 'native'
  })
}

var session = expressSession(sessionVar)
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session)
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

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

// app.use(session)
var io = require('socket.io')(server)
io.use(function (socket, next) {
  session(socket.request, socket.request.res, next)
})
io.on('connection', function (socket) {
  require('./game/code/terminal')(socket)
})

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

module.exports = app
