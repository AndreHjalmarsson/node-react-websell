const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  productId: String,
  created: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Must have an author'
  }
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
