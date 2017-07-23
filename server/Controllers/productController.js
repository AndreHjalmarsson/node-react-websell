const Product = require('../Models/ProductModel');
const User = require('../Models/UserModel');


exports.addProduct = async (req, res) => {
  // const product = new Product(req.body);
  // await product.save();
  res.send(req.user);
}