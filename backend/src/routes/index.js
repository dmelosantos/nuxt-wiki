const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Server is Online');
  res.end();
});

module.exports = router;
