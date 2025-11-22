const express = require('express');
const router = express.Router();
const chain = require('../blockchain/chain');

// GET verify page
router.get('/', (req, res) => {
  res.render('verify', { title: 'Verify Credential', result: null });
});

// POST verify
router.post('/', (req, res) => {
  const { hash } = req.body;
  if (!hash) return res.render('verify', { title: 'Verify Credential', result: { error: 'Please enter a hash to verify' } });

  const rec = chain.findByHash(hash.trim());
  if (rec) {
    return res.render('verify', { title: 'Verify Credential', result: { verified: true, record: rec } });
  } else {
    return res.render('verify', { title: 'Verify Credential', result: { verified: false } });
  }
});

module.exports = router;
