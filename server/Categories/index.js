const express = require("express"),
      router = express.Router({mergeParams: true}),
      aHandler = require('express-async-handler'),
      {isAdmin} = require('../middleware/roleMiddleware'),
      cateogryCtr = require('./categoryCtr');

router.get('/',
  aHandler( cateogryCtr.getAll() ),
);

router.get('/:categryId',
  aHandler( cateogryCtr.getOne() ),
);

router.post('/',
  aHandler( isAdmin ),
  aHandler( cateogryCtr.create() ),
);

router.put('/:categryId',
  aHandler( isAdmin ),
  aHandler( cateogryCtr.update() ),
);

router.delete('/:categryId',
  aHandler( isAdmin ),
  aHandler( cateogryCtr.delete() ),
);
module.exports = router;