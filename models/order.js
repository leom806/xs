
module.exports = function (){
  var db = require('../database/connect.js')();
  var Schema = require('mongoose').Schema;

  var orderSchema = Schema({
    description: {
      type: String,
      required: true
    },
    customer: {
      type: String,
      required: true
    },
    attendant: {
      type: Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    }
  });

  orderSchema.static.getOrders = function(cb){
    return this.find({}).sort({status: 1}).exec(cb);
  }
  
  return db.model('order', orderSchema);
}