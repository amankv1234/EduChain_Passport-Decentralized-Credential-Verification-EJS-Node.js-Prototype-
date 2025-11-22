const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('zkproof', { title: 'ZKP Demo' });
});

module.exports = router;
