var express = require('express');
var router = express.Router();
var db = require('../database/connect.js')();
var users = require('../models/users.js')();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('index', { 
    title: 'Entrar',
    err: "" 
  });
});

router.post('/login', function(req, res, next){
  var params = req.body;  
  users.find({
    username: params.username,
    password: params.password
  }, function (err, match) {

    if(err){
      res.render('index', {
        title: "Entrar",
        err: "Ocorreu um erro inesperado, tente novamente"
      });
    }

    if(match.length == 1){
      req.session.username = match[0].username;
      req.session.ip = req.connection.remoteAddress;
      res.redirect('/dashboard');
    }else{
      res.render('index', {
        title: "Entrar",
        err: "Usuário e/ou senha incorreto(s)"
      });
    }
  }); 
  
});

router.get('/denied', function(req, res, next){
  res.render('denied', {
    title: "Acesso Negado"
  });
});

router.get('/logout', function(req, res, next){
  res.redirect('/');
});

module.exports = router;
