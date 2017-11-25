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

function autopop(next) {
  this.populate('author');
  next();
}

commentSchema.pre('findOne', autopop);
commentSchema.pre('find', autopop);

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
