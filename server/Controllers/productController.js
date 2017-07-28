const Product = require('../Models/ProductModel');

exports.addProduct = async (req, res) => {
  req.body.author = req.user.id;
  const product = new Product(req.body);
  await product.save();
}

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
}

exports.getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
}