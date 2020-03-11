const nodemailer = require('nodemailer'),
      hbs = require('nodemailer-express-handlebars'),
      serv = {};

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'views/email',
    defaultLayout: 'template',
    partialsDir: 'views/partials'
  },
  viewPath: 'views/email',
  extName: '.hbs'
}

let mailer = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW
  }
})


serv.sendResetPassword = async (email, token) => {
  console.log('email :', email);
  // mailer.use('compile', hbs(options))
  mailer.use('compile', function(mail, callback){
    callback();
  });
  const mail = await mailer.sendMail({
    from: 'donotreply@aperture-science.com',
    to: email,
    subject: 'Reset your password for Aperture Science',
    text: process.env.BASE_URL + '/recovery-password?token=' + token + "&email=" + email,
  })
}

module.exports = serv;