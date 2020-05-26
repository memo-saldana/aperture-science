const stripe = require('stripe')(process.env.STRIPE_KEY),
      MyError = require('../middleware/MyError'),
      serv = {};

serv.linkAccount = async code => {
  return new Promise((resolve, reject) => {
    stripe.oauth.token({
      grant_type: 'authorization_code',
      code
    })
    .then(response => {
      console.log('response :>> ', response);
      return resolve(response.stripe_user_id);
    })
    .catch(err => {
      if(err.type === 'StripeInvalidGrantError') {
        return reject(new MyError(400, `Invalid authorization code: ${code}`));
      } else {
        console.log('err :>> ', err);
        return reject(new MyError(500, `Unknown error`));
      }
    })
  });
}

serv.validateWebhook = req => {
  return new Promise((resolve, reject) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    }
    catch(err) {
      console.log('err :>> ', err);
      return reject(new MyError(400, `Webhook error: ${err.message}`));
    }
    resolve(event)
  });
}

serv.getCustomer = (user) => {
  return new Promise((resolve, reject) => {
    stripe.customers.retrieve( user._id.toString() )
        .then(customer => resolve(customer))
        .catch( (error) => {
          console.log('error : ', error);
          if (error.code = 'resource_missing') {
            console.log('did not find cust');

            // console.log('email :', user.data.correo );
            stripe.customers.create({
              id: user._id.toString(),
              email: user.email,
              name: user.name
            })
                .then( (customer) => {
                  return resolve(customer);
                })
                .catch((error) =>{
                  console.log('Error creating cust.');

                  return reject(error);
                });
          } else return reject(error);
        });
  });
};

serv.createSession = (user, project, amount) => {
  return new Promise((resolve, reject) => {
    serv.getCustomer(user)
    .then(customer => {
      console.log('customer stripe :>> ', customer);
      return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: "Donation for " + project.title + " by " + project.owner.name + " on Opening Science.",
          amount: amount,
          currency: 'mxn',
          quantity: 1
        }],
        payment_intent_data: {
          application_fee_amount: parseInt(amount*.05) > 100? parseInt(amount*.05) : 100,
          transfer_data: {
            destination: project.owner.stripeId
          },
        },
        success_url: process.env.BASE_URL + '/success',
        cancel_url: process.env.BASE_URL + '/project?projectId=' + project._id.toString(),
        customer: customer.id
      });
    })
    .then(session => resolve(session))
    .catch(err => reject(err))
  });
}

module.exports = serv;