const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');

const authController = require('./Controllers/authController');
const productController = require('./Controllers/productController');

// Passport local strategy works as login middleware.
const router = express.Router();
const loginAuth = passport.authenticate('local', { session: false });
const requestAuth = passport.authenticate('jwt', { session: false });

router.get('/', 
  requestAuth,
  authController.getIndex
);

router.post('/register', 
  authController.validateRegistration,
  authController.register
);

router.post('/login', 
  loginAuth,
  authController.login
);

router.post('/addproduct', 
  requestAuth,
  productController.storeImage,
  productController.addProduct
);

router.get('/getproducts', productController.getProducts);

router.get('/getproduct/:id', productController.getProduct);


module.exports = router;
