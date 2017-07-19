const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config({ path: 'variables.env' });


const User = require('../Models/UserModel');

// Creating a passport local strategy. createStrategy is available because we used
// the passportLocalMongoose plugin in UserModel.
passport.use(User.createStrategy());
// These functions lets us set the UserModel object on the req obj. (req.user)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// options for our jwt check when making a authenticated request
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
};
 //See if the id in the users' jwt matches an id in our database. Payload being the jwt data and
  //'done' the cb we run after checking the data.
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false) };
    // if we find a user with matching id we invoke the done callback with the user object,
    // else with 'false'
    user ? done(null, user) : done(null, false);
  });
});

//Tell passport we wanna use jwt Strategy
passport.use(jwtLogin);