const validator = require('validator');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseError = require('mongoose-mongodb-errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    uniq: true,
    lowercase: true,
    required: 'Must provide a valid emial',
    trim: true,
    validate: [validator.isEmail, 'Must provide a valid email']
   },
  name: {
    type: String,
    required: 'Must provide a name',
    trim: true
   }
});

// Adding plugins to manage user's password field
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// Gets us nicer mongodb errors
userSchema.plugin(mongooseError);



// Creating the model as 'User' with the created userSchema
const UserModel = mongoose.model('User', userSchema);

// Exporting the model
module.exports = UserModel;