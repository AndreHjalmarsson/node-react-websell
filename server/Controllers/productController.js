const Product = require('../Models/ProductModel');

exports.addProduct = async (req, res) => {
  req.body.author = req.user.id;
  const product = new Product(req.body);
  await product.save();
}