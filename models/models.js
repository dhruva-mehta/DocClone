var mongoose = require('mongoose');

if (! process.env.MONGODB_URI){
  console.log('Error: MONGODB_URI is not set. Did you run source env.sh ?');
  process.exit(1);
}

var connect = process.env.MONGODB_URI;
mongoose.connect(connect)

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})

var docSchema = mongoose.Schema({
  docName:{
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref:
     'User'
  },
  collaborators: [{
    type: mongoose.Schema.ObjectId,
    ref:
     'User'
  }],
  file: [{
    content: {
      type:String,
    },
    date: {
      type: Date,
    }
  }]
})

var User = mongoose.model('User', userSchema);
var Doc = mongoose.model('Doc', docSchema);

module.exports = {
  User: User,
  Doc: Doc,
}
