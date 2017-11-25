const Comment = require('../Models/CommentModel');

exports.addComment = async (req, res) => {
  req.body.author = req.user;
  const comment = new Comment(req.body);
  await comment.save();
  res.send({ message: 'Comment added' });
};

exports.getComments = async (req, res) => {
  console.log(req.params);
  const comments = await Comment.find({
    productId: req.params.id
  });
  res.send(comments);
};
