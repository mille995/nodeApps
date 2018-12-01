// model that defines the schema

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
Bcrypt = require('bcryptjs');

// note:  there are both UserSchema and userSchema variables in the instructions
// all code has been changed to use userSchema (lower case u)
var userSchema = new Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  active: { type: Boolean, require: true, default: true },
  role: { type: String, require: true, enum: ['admin', 'user', 'staff'] },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  dateRegistered: { type: Date, default: Date.now }
});

// userSchema.pre - pre hook needs to go after the definition and before the model
// this will encrypt the password
userSchema.pre('save', function (next) {
  var person = this;
  if (this.isModified('password') || this.isNew) {
    Bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      Bcrypt.hash(person.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        person.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// this will compare the password that is sent in with the stored password
userSchema.methods.comparePassword = function (passw, cb) {
  Bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

userSchema.virtual('fullName')
.get(function(){
  return this.firstname + ' ' + this.lastname;
});

module.exports = Mongoose.model('User', userSchema);