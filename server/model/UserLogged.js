var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var Schema = new mongoose.Schema({
  userid: String,
  usertoken: String,
  generatedtoken: String,
  created_at:  { type : Date, default: Date.now },
  updated_at:  { type : Date, default: Date.now },
  created_by: String,
  active: {type: Number, default: 1},
  name: String,
  username: String,
  email: String,
  token: String,
  role: String,
  employee:{},
  restdata:{}
});

mongoose.model('LoggedInUser', Schema);

