var express = require('express');
var router = express.Router();

const assert = require('../controller/asset');

router.use('/assert', assert);


router.post('/setup', (req, res) => {
  res.json("Setup");
})

module.exports = router;