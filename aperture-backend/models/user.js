const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      validator = require('validator'),
      bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is missing"],
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    type: String,
    required: [true, "Password is missing"]
  },
  tokens: [{
    type: String,
    select:false
  }]
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

userSchema.methods.comparePassword = async function (password) {

  const matches = await bcrypt.compare(password, this.password);

  return matches;
};

userSchema.methods.generateToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days'})
  user.tokens.push(token)
  await user.save()
  return token;
}

module.exports = mongoose.model('User',userSchema);