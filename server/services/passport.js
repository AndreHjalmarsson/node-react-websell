const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../Models/UserModel');

// Creating a passport local strategy. createStrategy is available because we used
// the passportLocalMongoose plugin in UserModel.
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
