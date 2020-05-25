const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      bodyParser = require('body-parser'),
      {isAdmin, isOwnerOrAdmin, isLoggedIn} = require('../middleware/roleMiddleware'),
      paymentCtr = require('./paymentCtr');

router.get('/users/:userId/state',
  aHandler( isOwnerOrAdmin ),
  aHandler( paymentCtr.getState() ),
);

router.get('/stripe', 
  aHandler( paymentCtr.linkStripe() )
);

router.post('/donate',
  bodyParser.raw({type: 'application/json'}),
  aHandler( paymentCtr.payProject() ),
);

router.post('/projects/:projectId/users/:userId',
  aHandler( isLoggedIn ),
  aHandler( paymentCtr.createSession() ),
);

module.exports = router;