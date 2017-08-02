const Product = require('../Models/ProductModel');
const multer = require('multer');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		isPhoto ? next(null, true) : next({ message: "Filetype not allowed" }, false);
	}
};

exports.upload = multer(multerOptions).any();

exports.storeImage = async (req, res, next) => {
  console.log(req.file);
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