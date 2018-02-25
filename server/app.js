const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

var port = process.env.PORT || 3000;

// connect to the database and load models
require('./models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
/*
app.use(express.static('./server/static/'));
app.use(express.static('../dist/'));
*/
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// disable cors and add proxy for future use and security
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});