const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      validator = require('validator'),
      crypto = require('crypto'),
      MyError = require('../models/MyError'),
      stripe = require('../services/stripe'),
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
    select: false,
    type: String,
    required: [true, "Password is missing"],
  },
  tokens: {
    type: [{
      type: String,
    }],
  select: false,
},
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  },
  role: {
    type: String,
    default: "user",
    select: false,
  },
  state: {
    type: String,
    select: false
  },
  stateExpires: {
    type: Date,
    select: false,
  },
  stripeId: {
    type: String,
    select: false,
  }
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
    user.resetPasswordToken = token;
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
  const user = await this.findById(userId).exec();

  user.password = password;
  return await user.save();
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

userSchema.methods.generateState = async function() {
  const buffer = crypto.randomBytes(4);
  const token = buffer.toString('hex');
  this.state = token;
  //Valid for 1 hour
  this.stateExpires = Date.now() + 3600000;
  await this.save();
  return token;
}

userSchema.statics.verifyState = async function(state) {
  const stateTokens = state.split('-');
  const userId = stateTokens[0];
  const token = stateTokens[1];

  const user = await this.findOne({
    _id: userId,
    state: token, 
    stateExpires: { $gt: Date.now() },
  }).exec();

  return user? user : Promise.reject(new MyError(404, 'User not found'));
}

userSchema.methods.linkStripe = async function(code) {
  const id = await stripe.linkAccount(code);

  this.stripeId = id;

  return await this.save();
}

userSchema.statics.getAll = async function(page, pageSize) {
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  pageSize = pageSize > 0 ? pageSize : 10; 
  page = page > 0 ? page - 1: 0;
  
  const [projects, count] = await Promise.all([
    this.find({})
           .skip(page * pageSize)
           .limit(pageSize)
           .exec(),
    this.countDocuments({})
  ])

  return {projects, page, totalPages: Math.ceil(count/pageSize)}
}

module.exports = mongoose.model('User',userSchema);