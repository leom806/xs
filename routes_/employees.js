var express = require('express');
var router = express.Router();
var db = require('../database/connect.js')();
var employees = require('../models/employee.js')();

router.get('/', function(req, res, next){

  if(typeof req.session.username === 'undefined'){
    res.redirect('/denied');
  }

  employees.find({}).sort({name:-1}).exec(function(err, employees){
    res.render('employees', {
      title: "Funcionários",
      address: req.session.ip, 
      user: req.session.username,
      employees: employees
    });
  });
});

router.post('/new', function(req, res, next){
  employees.create(req.body, function(){
    res.redirect('/employees');
  });
});

router.get('/del/:id', function(req, res, next){
  var id = req.params.id;
  employees.remove({_id:id}, function(){
    res.redirect('/employees');
  });
});

module.exports = router;