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

// A function to populate the seller field with all the fields that it refenrences, in this case being the UserModel
// this will take fields like name and email that exists in the usermodel and put it on the product.seller obj.
function autopop(next) {
  this.populate('seller');
  next();
}

// telling when to do the seller autopop. In this case when we find a specific product we want to autopop the seller
productSchema.pre('findOne', autopop);
productSchema.pre('find', autopop);

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;