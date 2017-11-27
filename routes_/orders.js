var express = require('express');
var router = express.Router();
var db = require('../database/connect.js')();
var orders = require('../models/order.js')();

router.get('/', function(req, res, next){
  if(typeof req.session.username === 'undefined'){
    res.redirect('/denied');
  }

  orders.find({}).sort({status:1}).exec(function(err, orders){
    res.render('orders', {
      title: "Pedidos",
      user: req.session.username,
      orders: orders
    });
  });
});

router.post('/new', function(req, res, next){
  var order = req.body;
  order.description = order.description.replace(/[\n\r]/g, "\n<br/>");
  orders.create(order, function(){
    res.redirect('/orders');
  });
});

router.get('/turn/:id', function(req, res, next){
  var id = req.params.id;
  orders.findById(id, function(err, order){
    order.status =  !order.status;
    order.save();
    res.redirect('/orders');
  });
});

router.get('/del/:id', function(req, res, next){
  var id = req.params.id;
  orders.remove({_id:id}, function(err){
    res.redirect('/orders');
  });
});

module.exports = router;