var mongoose = require('mongoose');
var UserSchema = {
  fname: {
    type:String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};
var User = mongoose.model('User', UserSchema);
module.exports = User;
