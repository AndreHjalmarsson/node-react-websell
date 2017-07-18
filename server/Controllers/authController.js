const User = require('../Models/UserModel');
const jwt = require('jwt-simple');
const promisify = require('es6-promisify');

// Function to create and send a jwt token. Used as end middleware when signing up
// and also signing in.
function setJwtToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.getIndex = (req, res, next) => {
  res.send({ hi: 'very secret stuff here' });
};

// Various validation to validate the new user info. These methods are available since we added 
// expressValidator to our index.js file.
exports.validateRegistration = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must provide a name').notEmpty();
  req.checkBody('email', 'You must provide a valid email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'You must provide a password').notEmpty();
  req.checkBody('password-confirm', 'You must provide a confirmation password').notEmpty();
  req.checkBody('password-confirm', 'Passwords do not match').equals(req.body.password);

  // If any error occured above, function below will fire off
  const errors = req.validationErrors();
  if (errors) {
    res.send({ error: errors.map(err => err.msg) });
    //sending error and returning from function
    return;
  };
  //If all went well we proceed to register the user
  next();
};

exports.register = async (req, res, next) => {
  //checking if registration email is already in the databse
  const emailExists = await User.findOne({ email: req.body.email });
  //if email exists we send an error
  if(emailExists) {
    res.send({ error: 'Email is already in use' });
  }
  // Register the user
  const user = new User({ email: req.body.email, name: req.body.name });
  // In order to store the password in the databse we must use the register method that
  //lives on our User object (User.register). This method comes from the passportLocalMongoose 
  //plugin that we added in the UserModel. But first we must promisify the method in order to use await.
  const promisifiedRegister = promisify(User.register, User);
  // After we have promisified the User.register method we await it and the user will be saved to
  //our database
  await promisifiedRegister(user, req.body.password);
  // the last thing is to provide the new user with a jwt, this will be used to automagically 
  // log the user in on the client side.
  const jwtToken = setJwtToken(user);
  res.send({ jwtToken });
  next();
};

exports.login = (req, res) => {
  // after giving the user the jwt a login will happen on the client side.
  const jwtToken = setJwtToken(req.user);
  res.send({ jwtToken });
};