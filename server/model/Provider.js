var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var ProviderSchema = new mongoose.Schema({
  name: {type: String},
  created_at:  { type : Date, default: Date.now },
  updated_at:  { type : Date, default: Date.now },
  created_by: {type: String, default: ''},
  updated_by: {type: String, default: ''},
  active: { type: Number, default: 1 },
  note: { type: String },
  clientId: { type: String },
  restaurant:{type: String}
});

mongoose.model('Provider', ProviderSchema);

