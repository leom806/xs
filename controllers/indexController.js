module.exports = function(app){

  // Models
  var users = app.models.users;

  var IndexController = {

    // Requisição principal
    home: function(req, res){
        req.session.destroy();
        res.render('index/login', { 
          title: 'Entrar',
          err: "" 
        });
    },

    // Ação de login 
    login: function(req, res){
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
          res.redirect('/dashboard/index');
        }else{
          res.render('index/login', {
            title: "Entrar",
            err: "Usuário e/ou senha incorreto(s)"
          });
        }
      }); 
    },

    // Qualquer tentativa de acesso sem permissão é redirecionado para cá
    denied: function(req, res){
      res.render('denied', {
        title: "Acesso Negado"
      });
    },

    // Sai do sistema
    logout: function(req, res){
      res.redirect('/');
    }
  };

  
  return IndexController;
};