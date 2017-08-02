const Product = require('../Models/ProductModel');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		isPhoto ? next(null, true) : next({ message: "Filetype not allowed" }, false);
	}
};

exports.upload = multer(multerOptions).single('photo');

exports.storeImage = async (req, res, next) => {
	if (!req.file) {
		next(); // skip to the next middleware
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	// now we resize
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./uploads/${req.body.photo}`);
	// once we have written the photo to our filesystem, keep going!
	next();
};

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