const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isOwnerOrAdmin, isLoggedIn} = require('../middleware/roleMiddleware'),
      projectCtr = require('./projectCtr');

router.get('/projects',
  aHandler( projectCtr.getAll() ),
);

router.get('/projects/:projectId',
  aHandler( projectCtr.getOne() ),
);

router.get('/projects/:projectId/donate',
  aHandler(isLoggedIn),
  aHandler( projectCtr.getStripeID() ),
);

router.post('/users/:userId/projects',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.create() ),
);

router.get('/users/:userId/projects',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.getForOneUser() ),
);

router.put('/users/:userId/projects/:projectId',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.update() ),
);

router.delete('/users/:userId/projects/:projectId',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.delete() ),
);
module.exports = router;