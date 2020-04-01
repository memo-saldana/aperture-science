const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      validator = require('validator'),
      crypto = require('crypto'),
      MyError = require('../models/MyError'),
      bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is missing"],
  },
  about: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Invalid email')
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
  },
  tokens: [{
    type: String,
    select: false,
  }],
}, {
  timestamps: true,
})

// Validate if email is unique - unique option only creates an index
userSchema.path('email').validate(async function(value) {
  const emailCount = await mongoose.models.User.countDocuments({email: value, _id: { $ne: this._id  } });
  return !emailCount;
}, 'El correo {VALUE} ya fue utilizado.');

userSchema.pre('save', function(next) {
  const user = this
  if( user.isModified('password') ) {
    bcrypt.hash(user.password, 10).then(function(hash){
      user.password = hash
      next()
    }).catch(function(error){
      return next(error)
    })
  } else {
    next()  
  }
})

userSchema.statics.generateResetToken = async function(email){
  
  const user = await this.findOne({email}).exec();
  console.log('user :', user);
  if(user){
    // console.log('user found, generating token');
    
    const buffer = crypto.randomBytes(4);
    const token = buffer.toString('hex');
    user.resetPasswordToken = buffer;
    //Valid for 1 hour
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    return  Promise.resolve({user: user, token: token});
  } else {
    // console.log('user not found, no action taken');
    
    return Promise.resolve({ user: null, token: null});
  }
}

userSchema.statics.verifyToken = async function(email, token) {
  const user = await this.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  }).exec();
  
  if(user){
    return Promise.resolve(user._id);
  } else {
    return Promise.reject(new MyError(409, "Link has expired."));
  }
}

userSchema.statics.changePassword = async function(userId, password) {
  const user = await User.findById(userId).exec();

  user.password = password;
  return await user.save({ validateBeforeSave: false });
}

userSchema.methods.comparePassword = async function (password) {

  const matches = await bcrypt.compare(password, this.password);

  return matches;
};

userSchema.methods.generateToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days'});
  user.tokens.push(token);
  await user.save();
  return token;
}

module.exports = mongoose.model('User',userSchema);