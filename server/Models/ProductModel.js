const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, lowercase: true },
  description: String,
  type: String,
  price: Number,
  created: { type: Date, default: Date.now },
  seller: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'Must provide a seller' },
  photo: String
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;