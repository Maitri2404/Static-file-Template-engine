const fs = require('fs');

function getUsersFromFile() {
  const data = fs.readFileSync('./users.json', 'utf-8');
  return JSON.parse(data);
}

function getApiKey() {
  return 'mncd1234';
}
function isUserUnique(user) {
  const users = getUsersFromFile().users;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user.username || users[i].email === user.email) {
      return false;
    }
  }
  return true;
}

function validateApiKey(req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== getApiKey()) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid API key' }));
  }
}

module.exports = {
  getUsersFromFile,
  getApiKey,
  isUserUnique,
  validateApiKey,
};
















