const express = require('express');
const passport = require('passport');
const passportService = require('./services/passport');

const authController = require('./Controllers/authController');

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


module.exports = router;
