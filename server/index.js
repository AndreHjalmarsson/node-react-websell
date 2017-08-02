//starting point for the server app
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');

const routes = require('./router');

//Importing variables from variables.env file and putting on process.env object
require('dotenv').config({ path: 'variables.env' });

//Connecting to MongoDB
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', error => {
  console.log(`Database connection failed: ${error.message}`);
});

//Initialising the app
const app = express();

app.use(morgan('combined'));

// Opens the server up for different domains
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns it into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//To make further validation in the app. Used when validating a registration
app.use(expressValidator());

//When all middleware are passed we initialize the routes
app.use('/', routes);

//Staring up the server
app.set('port', process.env.PORT || 3333);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port -> ${server.address().port}`);
});