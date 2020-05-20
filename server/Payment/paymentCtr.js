
const User = require('../models/user'),
      Project = require('../models/project'),
      MyError = require('../middleware/MyError'),
      stripe = require('../services/stripe'),
      ctr = {};

ctr.getState = () => async (req, res, next) => {
  const {userId} = req.params;
  
  const user = await User.findOne({_id: userId}).exec();

  if(!user) throw new MyError(404, 'User not found.');

  let token = await user.generateState();

  return res.status(200).json({state: `${userId}-${token}`});
}

ctr.linkStripe = () => async (req, res, next) => {
  const {code, state} = req.query;
  if(!state) throw new MyError(400, "No state received")
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

ctr.createSession = () => async (req, res, next) => {
  const {projectId, userId} = req.params;
  
  const user = userId == req.user._id.toString() ? 
    req.user :
    await User.findOne({_id: userId}).exec();

  const project = await Project.findOne({
    _id: projectId,
    bActive: true,
  }).populate('owner', '+stripeId').exec()

  if(!project) throw new MyError(404, "Project not found.");

  const session = await stripe.createSession(user, project, amount);

  return res.status(200).json({session});
}

module.exports = ctr;
