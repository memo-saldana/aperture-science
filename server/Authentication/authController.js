const User = require('../models/user'),
      mailer = require('../services/mailer'),
      MyError = require('../models/MyError'),
      ctr = {};

ctr.signup = () => async (req,res,next) => {
  const {name, email, confirmPassword, password } = req.body;
  if(password != confirmPassword) return Promise.reject(new MyError(400, "Passwords do not match."));
  let user = new User({name, email, password})
  await user.save();
  res.status(201).json({
    message: "Se creo el usuario exitosamente.",
    user: user
  })
}

ctr.login = () => async (req,res,next) => {
  const {email, password} = req.body;
  let user = await User.findOne({email}).select('+password').exec();
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

ctr.sendRecoveryEmail = () => async (req, res, next) => {
  const {email} = req.body;

  res.status(200).json({message: "An email will be sent if the address corresponds to a valid account."});

  const { user,token } = await User.generateResetToken(email);
  if(user){
    await mailer.sendResetPassword(email, token);
  }
}

ctr.verifyToken = () => async (req, res, next) => {
  const {email, token} = req.query;

  await User.verifyToken(email, token);

  return res.status(200).json({message: "Link is valid."});
}

ctr.resetPassword = () => async (req,res,next) => {
  const {email, token, password} = req.body;
  
  const userId = await User.verifyToken(email, token);

  await User.changePassword(userId, password)

  res.status(200).json({message: "Se restableció la contraseña exitosamente"})
}


module.exports = ctr;