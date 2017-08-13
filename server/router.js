const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');

const authController = require('./Controllers/authController');
const productController = require('./Controllers/productController');
const cartController = require('./Controllers/cartController');
const userController = require('./Controllers/userController');

// Passport local strategy works as login middleware.
const router = express.Router();
const loginAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', 
  authController.getIndex
);

router.get('/currentuser',
  jwtAuth,
  userController.currentUser
)

router.get('/getuser/:id',
  userController.getUser
)

router.post('/register', 
  authController.validateRegistration,
  authController.register
);

router.post('/login', 
  loginAuth,
  authController.login
);

router.post('/addproduct', 
  jwtAuth,
  productController.upload,
  productController.storeImage,
  productController.addProduct
);

router.get('/getproducts', productController.getProducts);

router.get('/getproduct/:id', productController.getProduct);

router.post('/addtocart/:id',
  jwtAuth,
  cartController.addToCart
);

router.get('/getcart',
  jwtAuth,
  cartController.getCart
);

router.post('/searchproducts', productController.searchProducts);


module.exports = router;
