const Comment = require('../Models/CommentModel');

exports.addComment = async (req, res) => {
  req.body.author = req.user;
  console.log(req.body);
  const comment = new Comment(req.body);
  await comment.save();
  res.send({ message: 'Comment added' });
};
