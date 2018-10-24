var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    active: {type: Boolean, default: true},
    dateRegistered: { type: Date, require: true, default: Date.now },
    role: {type: String, enum: ['admin', 'user', 'staff']},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true }
});
      

module.exports = Mongoose.model('MyModel', mySchema);
