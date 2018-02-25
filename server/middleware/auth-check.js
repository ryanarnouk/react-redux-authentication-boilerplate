const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

// middleware authentication checker
module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  // decode the token
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if(err) { return res.status(401).end(); }

    const userId = decoded.sub;

    return User.findById(userId, (userErr, user) => {
      if(userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
}