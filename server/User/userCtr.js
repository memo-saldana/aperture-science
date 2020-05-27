const User = require('../models/user'),
      MyError = require('../middleware/MyError'),
      stripe = require('../services/stripe'),
      ctr = {};

ctr.getAll = () => async (req, res, next) => {
  const {page, pageSize} = req.query;

  const body = await User.getAll(page, pageSize);

  return res.status(200).json(body);
}

ctr.getOne = () => async (req, res, next) => {
  const {userId} = req.params;
  
  const query = User.findOne({_id: userId})

  if(!req.user || (req.user && req.user._id.toString() !== userId) || req.user.role == 'admin') {    
    query.select('name about');
  }
  else {
    query.select('+stripeId')
  }

  const user = await query.exec();

  if(!user) {
    throw new MyError(404, 'User not found')
  }
  return res.status(200).json({user});
}

ctr.update = () => async (req, res, next) => {
  const {userId} = req.params;
  const userBody = req.body;
  let disconnect = false
  let newObj = {new: true}
  if (userBody.stripeId == '') {
    disconnect = true;
    newObj = {new: false, fields: '+stripeId'};
    userBody.stripeId = undefined;
  }

  let user = await User.findOneAndUpdate({_id: userId}, userBody, newObj).exec();

  if (!user) {
    throw new MyError(404, 'User not found')
  }
  if(disconnect) {
    await stripe.disconnect(user)
    user = user.toObject()
    delete user.stripeId
  }

  return res.status(200).json({user});
}

ctr.delete = () => async (req, res, next) => {
  const {userId} = req.params;

  const user = await User.findOneAndRemove({_id:userId}).exec();

  if (!user) {
    throw new MyError(404, 'User not found')
  }

  return res.status(200).json({user});
}

module.exports = ctr;