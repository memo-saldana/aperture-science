const jwt = require('jsonwebtoken');
const MyError = require('./MyError');
const User = require('../models/user');
const mw = {};

mw.isAdmin = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Inicie sesión'));
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data.id).select('+role +bActive').exec();
  if (user && !user.bActive) {
    return Promise.reject(new MyError(405,
        'La sesión ha expirado, favor de iniciar sesión nuevamente'));
  }

  if (user && user.role == "admin") {
    next();
  } else if (user) {
    return Promise.reject( new MyError(403,
        'No tienes permiso para hacer eso'));
  } else {
    return Promise.reject( new MyError(404, 'No se encontró el usuario'));
  }
};

mw.isOwnerOrAdmin = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
    return Promise.reject(new MyError(401, 'Inicie sesión'));
  }
  const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
  const user = await User.findById(data.id).select('+role').exec();
  if (user && !user.tokens.in(token)) {
    return Promise.reject(new MyError(405,
        'La sesión ha expirado, favor de iniciar sesión nuevamente'));
  }
  if (user && (user._id == req.params.userId || user.role == "admin")) {
    next();
  } else if (user) {
    return Promise.reject( new MyError(403,
        'No tienes permiso para hacer eso'));
  } else {
    return Promise.reject( new MyError(404,
        'No se encontró el usuario'));
  }
};

module.exports = mw;
