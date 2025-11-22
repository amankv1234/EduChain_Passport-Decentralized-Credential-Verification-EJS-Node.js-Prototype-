// Simple in-memory blockchain simulation for credentials
const crypto = require('crypto');

let chain = []; // array of records

function generateHash(obj) {
  const json = JSON.stringify(obj);
  return crypto.createHash('sha256').update(json).digest('hex');
}

function addCredential(studentId, credential) {
  const record = {
    id: chain.length + 1,
    studentId,
    credential,
    timestamp: new Date().toISOString()
  };
  record.hash = generateHash(record);
  chain.push(record);
  return record;
}

function findByHash(hash) {
  return chain.find(r => r.hash === hash);
}

function getAll() {
  return chain;
}

// optional: preload data
function preload(records = []) {
  records.forEach(r => {
    const rec = addCredential(r.studentId, r.credential);
    // override timestamp/hash if original provided? we keep generated values
  });
}

module.exports = { addCredential, findByHash, getAll, preload };
