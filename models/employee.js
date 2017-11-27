module.exports = function (){
  var db = require('../database/connect.js')();
  var Schema = require('mongoose').Schema;

  var employeeSchema = Schema({
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    }
  });

  return db.model('employee', employeeSchema);
}