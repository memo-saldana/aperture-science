const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      authCtr = require('./authController');

router.post('/signup', aHandler(authCtr.signup()));

router.post('/login', aHandler(authCtr.login()));

module.exports = router;