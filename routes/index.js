var express = require('express');
var router = express.Router();
var passwordless = require('passwordless');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user != null ) {
    res.render('welcome', { user: req.user });
  }
  else {
    res.render('index', { user: req.user });
  }
});

router.get('/super', function (req, res, next) {
  res.send('index');
});


module.exports = router;
