module.exports = function () {
  var db = require('../database/connect.js')();
  var Schema = require('mongoose').Schema;

  var userSchema = Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    password: {
      type: String,
      unique: true,
      required: true,
      dropDups: true    
    },
    access_level: {
      type: Number,
      required: true
    }
  });

  return db.model('users', userSchema);
};