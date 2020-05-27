const User = require('../models/user'),
      MyError = require('../middleware/MyError'),
      ctr = {};

ctr.getAll = () => async (req, res, next) => {
  const {page, pageSize} = req.query;

  const body = await User.getAll(page, pageSize);

  return res.status(200).json(body);
}

ctr.getOne = () => async (req, res, next) => {
  const {userId} = req.params;
  
  const query = User.findOne({_id: userId})
  console.log('req.user :>> ', req.user);
  
  if(!req.user || (req.user && req.user._id.toString() !== userId) || req.user.role == 'admin') {
    console.log("anyone");
    
    query.select('name about');
  }
  else {
    console.log("myself");
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
  const userBody = req.params;

  const user = await User.findOneAndUpdate({_id: userId}, userBody, {new: true}).exec();

  if (!user) {
    throw new MyError(404, 'User not found')
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