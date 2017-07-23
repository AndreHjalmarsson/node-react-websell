const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');


exports.addProduct = async (req, res) => {
  // req.body.author = req.user._id;
  // const product = new Product(req.body);
  // await product.save();
  // NO ACCESS TO REQ.USER...
  res.send(req.user);
}