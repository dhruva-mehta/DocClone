var mongoose = require('mongoose');
var PostSchema ={
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
};
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
