//starting point for the server app
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const promisify = require('es6-promisify');
const cors = require('cors');
const expressValidator = require('express-validator');
require('./services/passport');

const routes = require('./router');

//Importing variables from variables.env file and putting on process.env object
require('dotenv').config({ path: 'variables.env' });


//Connecting to MongoDB
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', error => {
  console.log(`Database connection failed: ${error.message}`);
});
require('./Models/UserModel');
require('./Models/ProductModel');

//Initialising the app
const app = express();

app.use(morgan('combined'));

app.use(cors());

// Takes the raw requests and turns it into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//To make further validation in the app. Used when validating a registration
app.use(expressValidator());

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

//When all middleware are passed we initialize the routes
app.use('/', routes);

//Staring up the server
app.set('port', process.env.PORT || 3333);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port -> ${server.address().port}`);
});