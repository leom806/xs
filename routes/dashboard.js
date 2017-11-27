module.exports = function(app){

  var dashboard = app.controllers.dashboardController;

  app.get('/dashboard/index', dashboard.index);

  app.get('/dashboard/orders', dashboard.orders.show);
  app.post('/dashboard/orders/new', dashboard.orders.new);
  app.get('/dashboard/orders/del/:id', dashboard.orders.del);
  app.get('/dashboard/orders/turn/:id', dashboard.orders.turn);

  app.get('/dashboard/employees', dashboard.employees.show);
  app.post('/dashboard/employees/new', dashboard.employees.new);
  app.get('/dashboard/employees/del/:id', dashboard.employees.del);

};