const User = require('../Models/UserModel');

exports.addToCart = async (req, res) => {
  console.log(req.user);
  const productsInCart = req.user.cart.map(product => product.toString());
  const operator = productsInCart.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(req.user._id, {
    [operator]: { cart: req.params.id }
    },
    { new: true }
  );
  res.send({ id: req.params.id });
}