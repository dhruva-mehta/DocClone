var mongoose = require('mongoose');
var TokenSchema ={
  userId: String,
  token: String,
  createdAt: Date
};
var Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
