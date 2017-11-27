var express = require('express');
var router = express.Router();
var db = require('../database/connect.js')();

router.get('/', function(req, res, next){

  if(typeof req.session.username === 'undefined'){
    res.redirect('/denied');
  }

  res.render('dashboard', {
    title: "Dashboard",
    address: req.session.ip, 
    user: req.session.username
  });
});

module.exports = router;