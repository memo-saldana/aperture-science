const User = require('../models/user'),
      MyError = require('../models/MyError'),
      ctr = {};

ctr.signup = () => async (req,res,next) => {
  const { email, confirmPassword, password } = req.body;
  if(password != confirmPassword) return Promise.reject(new MyError(400, "Passwords do not match."));
  let user = new User({ email, password})
  await user.save();
  res.status(201).json({
    message: "Se creo el usuario exitosamente.",
    user: user
  })
}

ctr.login = () => async (req,res,next) => {
  const {email, password} = req.body;
  let user = await User.findOne({email}).exec();
  if(!user) return Promise.reject(new MyError(401, "Email or password incorrect, try again."));

  let matches = await user.comparePassword(password);
  if(!matches) return Promise.reject(new MyError(401, "Email or password incorrect, try again."));
  
  let token = await user.generateToken();
  user = user.toJSON();
  delete user.password;
  delete user.tokens;

  res.status(201).json({
    success: true,
    message: "Se creo el usuario exitosamente.",
    user: user,
    token: token
  })
}

module.exports = ctr;