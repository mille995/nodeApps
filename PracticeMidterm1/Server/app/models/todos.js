// model that defines the schema

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todosSchema = new Schema({
    Todo: { type: String, require: true },
    Priority: {type: String, require: true, enum: ['Critical', 'High', 'Medium', 'Low']},
    DateDue: { type: Date, default: Date.now }
  });
  
  module.exports = Mongoose.model('Todo', todoSchema);