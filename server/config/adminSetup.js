// Admin user setup
const User = require('../models/user');

/**
 * Sets up admin if not created
 * @return {adminUser}
 */
function adminSetup() {
  return new Promise((resolve, reject) => {
    User.findOne({role: "admin", email: process.env.ADMIN_MAIL},
        (err, admin) =>{
          if (err) return reject(err);
          if (admin) return resolve();
          const newUser = new User({
            email: process.env.ADMIN_MAIL,
            password: process.env.ADMIN_PW,
            name: 'Admin account',
            role: "admin",
          });
          newUser.save((err, createdUser) => {
            if (err) return reject(err);
            console.log('Admin created');
            return resolve(createdUser);
          });
        });
  });
};

module.exports = adminSetup;
