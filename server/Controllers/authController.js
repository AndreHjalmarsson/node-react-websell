const User = require('../Models/UserModel');
const promisify = require('es6-promisify');

exports.getIndex = (req, res, next) => {
  res.send({ hi: 'very secret stuff here' });
};

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

  res.send({ it: 'worked' });
};