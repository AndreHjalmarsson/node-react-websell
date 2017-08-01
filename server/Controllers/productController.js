const Product = require('../Models/ProductModel');
const fs = require('fs');

exports.storeImage = async (req, res, next) => {
  console.log(req.body.photo);
  // { preview: 'blob:http://localhost:8002/a5ecfc5-2405-4b58-953f-ff8e4c4815fb'}
  next();
}

exports.addProduct = async (req, res) => {
  req.body.seller = req.user.id;
  const product = new Product(req.body);
  await product.save();
}

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
}

exports.getProduct = async (req, res) => {
  // When fetching a product we populate the seller property, this will make all the Usermodel properties 
  // available on the seller object.
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
}