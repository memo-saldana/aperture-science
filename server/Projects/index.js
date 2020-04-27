const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isOwnerOrAdmin} = require('../middleware/roleMiddleware'),
      projectCtr = require('./projectCtr');

router.get('/',
  aHandler( projectCtr.getAll() ),
);

router.get('/:projectId',
  aHandler( projectCtr.getOne() ),
);

router.post('/',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.create() ),
);

router.put('/:projectId',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.update() ),
);

router.delete('/:projectId',
  aHandler( isOwnerOrAdmin ),
  aHandler( projectCtr.delete() ),
);
module.exports = router;