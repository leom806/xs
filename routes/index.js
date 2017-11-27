module.exports = function(app){

  var index = app.controllers.indexController;
  
  app.get('/', index.home);
  app.post('/login', index.login);
  app.get('/denied', index.denied);
  app.get('/logout', index.logout);
};