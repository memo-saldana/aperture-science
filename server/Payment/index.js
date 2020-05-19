const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isAdmin, isOwnerOrAdmin} = require('../middleware/roleMiddleware'),
      paymentCtr = require('./paymentCtr');

router.get('/users/:userId/state',
  aHandler( isOwnerOrAdmin ),
  aHandler( paymentCtr.getState() ),
);

router.get('/stripe', 
  aHandler( paymentCtr.linkStripe() )
);

router.post('/donate',
  aHandler( isOwnerOrAdmin ),
  aHandler( paymentCtr.payProject() ),
);

module.exports = router;