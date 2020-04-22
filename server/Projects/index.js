const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      projectCtr = require('./projectCtr');

router.get('/',
  aHandler( projectCtr.getAll() ),
);

router.get('/:projectId',
  aHandler( projectCtr.getOne() ),
);

router.post('/',
  aHandler( projectCtr.create() ),
);

router.put('/:projectId',
  aHandler( projectCtr.update() ),
);

router.delete('/:projectId',
  aHandler( projectCtr.delete() ),
);
module.exports = router;