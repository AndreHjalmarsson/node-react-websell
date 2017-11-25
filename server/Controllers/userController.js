const User = require("../Models/UserModel");

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  });
  res.send(user);
};

exports.currentUser = (req, res) => {
  res.send(req.user);
};
