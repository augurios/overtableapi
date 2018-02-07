var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var ErrorLogSchema = new mongoose.Schema({
    //clientId: { type: String },
  // invoiceNumber: { type: Number },
  //clientName: {type: String},
  //iscash: { type: Boolean, default: true },
  //tables: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
 // servedby: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
 // discount: {},
  //orders: [{
  //    note: String,
  //    quantity:{ type: Number },
  //    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  //    ingredient: [],
  //    variation: [],
  //    extraingredient:[],
       
    //}],
  employee:{},
  errorRefData: {},
  created_at:  { type : Date, default: Date.now },
  updated_at:  { type : Date, default: Date.now },
  //created_by: String,
  //updated_by: String,
  //active: {type: Number, default: 1},
  //syncflag: { type: Number, default: 0 },
  restaurantId:String,
 // people: { type: Number },
 
});

mongoose.model('ErrorLog', ErrorLogSchema);

