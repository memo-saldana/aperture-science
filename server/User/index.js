const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isOwnerOrAdmin, checkLogin} = require('../middleware/roleMiddleware'),
      userCtr = require('./userCtr');

// router.get('/',
//   aHandler( isOwnerOrAdmin ),
//   aHandler( userCtr.getAll() ),
// );

router.get('/:userId',
  aHandler( checkLogin ),
  aHandler( userCtr.getOne() ),
);

router.put('/:userId',
  aHandler( isOwnerOrAdmin ),
  aHandler( userCtr.update() ),
);

router.delete('/:userId',
  aHandler( isOwnerOrAdmin ),
  aHandler( userCtr.delete() ),
);
module.exports = router;