const express = require('express');
const router = express.Router();

const authController = require('./Controllers/authController');

router.get('/', authController.getIndex);

router.post('/register', 
  authController.validateRegistration,
  authController.register
);


module.exports = router;
