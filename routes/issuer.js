const express = require('express');
const router = express.Router();
const chain = require('../blockchain/chain');

// Render issuer page with a simple form
router.get('/', (req, res) => {
  res.render('issuer', { title: 'Issuer Portal', message: null });
});

// Handle issue form
router.post('/issue', (req, res) => {
  const { studentId, title, issuerName, issuedOn, validTill } = req.body;
  if (!studentId || !title || !issuerName) {
    return res.render('issuer', { title: 'Issuer Portal', message: 'Student ID, Title and Issuer are required.' });
  }

  const credential = {
    title,
    issuer: issuerName,
    issuedOn: issuedOn || new Date().toISOString().split('T')[0],
    validTill: validTill || 'Lifetime'
  };

  const record = chain.addCredential(studentId, credential);
  res.render('issuer', { title: 'Issuer Portal', message: `Credential issued. Hash: ${record.hash}` });
});

module.exports = router;
