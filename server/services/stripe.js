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

module.exports = serv;