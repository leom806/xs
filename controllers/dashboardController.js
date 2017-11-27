module.exports = function(app){

  /**
   * Models
   */ 
  var employees = app.models.employee;
  var orders = app.models.order;
  

  var dashboardController = {

    // Painel de controle
    index: function(req, res){
      if(typeof req.session.username === 'undefined'){
        res.redirect('/denied');
      }
    
      res.render('dashboard/index', {
        title: "Dashboard",
        address: req.session.ip, 
        user: req.session.username
      });
    },

    /**
     * Controle dos empregados
     * 
     * CRUD
     */
    employees: {

      show: function(req, res){
        if(typeof req.session.username === 'undefined'){
          res.redirect('/denied');
        }
      
        employees.find({}).sort({name:1}).exec(function(err, employees){
          res.render('dashboard/employees', {
            title: "Funcionários",
            address: req.session.ip, 
            user: req.session.username,
            employees: employees
          });
        });
      },

      new: function(req, res){
        employees.create(req.body, function(){
          res.redirect('/dashboard/employees');
        });
      },

      del: function(req, res){
        var id = req.params.id;
        employees.remove({_id:id}, function(){
          res.redirect('/dashboard/employees');
        });
      }

    },

    /**
     * Controle dos pedidos 
     * 
     * 'turn': serve para alternar o status do pedido, em espera ou atendido
     * 
     * CRUD
     */
    orders: {
      show: function(req, res){
        if(typeof req.session.username === 'undefined'){
          res.redirect('/denied');
        }
      
        orders.find({}).sort({status:1}).exec(function(err, orders){    
          
          employees.find({}).sort({name:1}).exec(function(err, employees){                        

            res.render('dashboard/orders', {
              title: "Pedidos",
              user: req.session.username,
              orders: orders,
              employees: employees 
            });  

          });
        });
      },

      new: function(req, res){
        var order = req.body;
        order.description = order.description.replace(/[\n\r]/g, "\n<br/>");
        orders.create(order, function(){
          res.redirect('/dashboard/orders');
        });
      },

      del: function(req, res){
        var id = req.params.id;
        orders.remove({_id:id}, function(err){
          res.redirect('/dashboard/orders');
        });
      },

      turn: function(req, res){
        var id = req.params.id;
        orders.findById(id, function(err, order){
          order.status =  !order.status;
          order.save();
          res.redirect('/dashboard/orders');
        });
      }
    }

  };

  return dashboardController;
};