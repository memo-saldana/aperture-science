const jwt = require('jsonwebtoken');
const MyError = require('./MyError');
const User = require('../models/user');
const mw = {};

mw.isAdmin = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Log in required'));
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
  if (user && !user.tokens.includes(token.split(' ')[1])) {
    return Promise.reject(new MyError(405,
        'Session has expired, login again.'));
  }

  if (user && user.role == "admin") {
    next();
  } else if (user) {
    return Promise.reject( new MyError(403,
        'You don\'t have permission to do that.'));
  } else {
    return Promise.reject( new MyError(404, 'User not found.'));
  }
};

mw.checkLogin = async (req, res, next) =>{
  let token = req.headers['authorization'];
  if (!token) {
    return next();
  }
  token = token.split(' ')[1];
  if(!token || token.length > 0) {
    next()
  }
  console.log('token :>> ', token);
  const data = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
  if (user && !user.tokens.includes(token.split(' ')[1])) {
    return Promise.reject(new MyError(405,
        'Session has expired, login again.'));
  }

  if (user) {
    delete user.tokens;
    delete user.bActive;
    req.user = user;
  }
  next();
};

mw.isLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next();
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
  if (user && !user.tokens.includes(token.split(' ')[1])) {
    return Promise.reject(new MyError(405,
        'Session has expired, login again.'));
  }

  if (user) {
    req.user = user;
    next();
  } else {
    return Promise.reject(new MyError(401, 'Log in required.'));
  }
}

mw.isOwnerOrAdmin = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Log in required.'));
  }

  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data._id).select('+role +tokens').exec();
  
  if (user && !user.tokens.includes(token.split(' ')[1])) {
    return Promise.reject(new MyError(405,
        'Session has expired, login again.'));
  }
  if (user && (user._id == req.params.userId || user.role == "admin")) {
    return next();
  } else if (user) {
    return Promise.reject( new MyError(403,
        'You don\'t have permission to do that.'));
  } else {
    return Promise.reject( new MyError(404,
        'User not found.'));
  }
};

module.exports = mw;
