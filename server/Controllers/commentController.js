const Comment = require('../Models/CommentModel');

exports.addComment = async (req, res) => {
  req.body.author = req.body.user;
  const comment = new Comment(req.body);
  await comment.save();
  res.send({ message: 'Comment added' });
};
