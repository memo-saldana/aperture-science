
const User = require('../models/user'),
      MyError = require('../middleware/MyError'),
      stripe = require('../services/stripe'),
      ctr = {};

ctr.getState = () => async (req, res, next) => {
  const {userId} = req.params;
  
  const user = User.findById(userId).exec();

  if(!user) throw new MyError(404, 'User not found.');

  let token = await user.generateState();

  return res.status(200).json({state: `${userId}-${token}`});
}

ctr.linkStripe = () => async (req, res, next) => {
  const {code, state} = req.query;

  const user = await User.verifyState(state);

  await user.linkStripe(code);

  res.redirect('/');
}

ctr.payProject = () => async (req, res, next) => {
  const event = await stripe.validateWebhook(req);
  
  switch(event.type) {
    case 'checkout.session.completed':
      console.log("payment successful");
      
    default:
      console.log('event.type :>> ', event.type);
      console.log("not handled.");
      
  }
  return res.status(200).json({message:'Payment successfull'});
}

module.exports = ctr;
