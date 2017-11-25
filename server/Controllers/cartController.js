const User = require('../Models/UserModel');

exports.addToCart = async (req, res) => {
  const productsInCart = req.user.cart.map(product => product._id.toString());
  const operator = productsInCart.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(req.user._id, {
    [operator]: { cart: req.params.id }
    },
    { new: true }
  );
  res.send(user.cart);
}

exports.getCart = async (req, res) => {
  // console.log(req.user);
  // const user = await User.findOne({ _id: req.user._id });
  // console.log(user);
  // const cartProducts = user.cart;
  // res.send(cartProducts);
  res.send(req.user.cart);
}