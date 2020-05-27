
const User = require('../models/user'),
      Project = require('../models/project'),
      Donation = require('../models/donation'),
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
    case 'account.application.deauthorized':
      const id = event.account
      const user = User.findOne({stripeId: id}).exec()

      if(user) {
        user.stripeId = undefined;
        await user.save();
      }
      break;

    case 'checkout.session.completed':
    case 'payment_intent.succeeded':
      console.log("payment successful");
      const session = event.data.object;
      const donation = Donation.findOneAndUpdate({stripeSessionId: session.id}, {status: 'Paid'}, {new: true}).exec();
      if(!donation) {
        console.log('DONATION NOT FOUND');
        
      }

      break;
    default:
      console.log('event.type :>> ', event.type);
      console.log("not handled.");
      
  }
  return res.json({received: true});
}

ctr.createSession = () => async (req, res, next) => {
  const {projectId, userId} = req.params;
  let {amount} = req.body;

  try {
    amount = parseInt(amount)
    if (isNaN(amount)) throw Error('NaN')
    if (amount < 1000) throw Error('Negative')
  } catch(e) {
    console.log('e :>> ', e);
  }
  throw new MyError(401, "You must donate at least $10.00 MXN.")
  const user = userId == req.user._id.toString() ? 
    req.user :
    await User.findOne({_id: userId}).exec();

  const project = await Project.findOne({
    _id: projectId,
    bActive: true,
  }).populate('owner', '+stripeId').exec()

  if(!project) throw new MyError(404, "Project not found.");

  const session = await stripe.createSession(user, project, amount);

  const donation = new Donation({
    donator: user._id,
    project: project._id,
    amount: amount,
    stripeSessionId: session.id
  })

  await donation.save();

  return res.status(200).json({sessionId: session.id});
}

module.exports = ctr;
