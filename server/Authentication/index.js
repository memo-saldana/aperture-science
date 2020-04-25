const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      authCtr = require('./authController');

router.post('/signup', aHandler(authCtr.signup()));

router.post('/login', aHandler(authCtr.login()));

router.post('/forgot', aHandler(authCtr.sendRecoveryEmail()));

router.get('/verify', aHandler(authCtr.verifyToken()));

router.post('/password', aHandler(authCtr.resetPassword()));

module.exports = router;