const express = require('express');
const router = express.Router();
const path = require('path');
const chain = require('../blockchain/chain');
const seedPath = path.join(__dirname, '..', 'data', 'prototype.json');
const fs = require('fs');

// Preload sample data once on server start
try {
  const raw = fs.readFileSync(seedPath, 'utf8');
  const arr = JSON.parse(raw);
  if (arr && arr.length > 0) chain.preload(arr);
} catch (e) {
  console.log('No seed data loaded:', e.message);
}

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'EduChain Passport' });
});

// Student wallet - show all credentials for demo
router.get('/wallet', (req, res) => {
  const all = chain.getAll();
  res.render('wallet', { title: 'Student Wallet', credentials: all });
});

module.exports = router;
