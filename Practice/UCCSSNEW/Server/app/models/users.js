// model that defines the schema

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true},
    active: {type: Boolean, require: true, default: true},
    role: {type: String, require: true, enum: ['admin', 'user', 'staff']},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    dateRegistered: { type: Date, default: Date.now }
  });
  
  module.exports = Mongoose.model('User', userSchema);