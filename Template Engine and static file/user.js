const fs = require('fs');
const { getUsersFromFile, getApiKey, isUserUnique, validateApiKey } = require('./middleware');

function handleAddUser(req, res) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== getApiKey()) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid API key' }));
  } else {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const Obj = JSON.parse(body);
      console.log(Obj)
      const user = {
        fullname: Obj.fullname,
        username: Obj.username,
        password: Obj.password,
        email: Obj.email,
        phoneNumber: Obj.phoneNumber,
      };
      if (!user.fullname || !user.username || !user.password || !user.email || !user.phoneNumber) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'All fields are required...!!' }));
      }
      else if (!isUserUnique(user)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Username or email already exists...' }));
      } else {
        const data = getUsersFromFile();
        data.users.push(user);
        fs.writeFileSync('./users.json', JSON.stringify(data));
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'User created successfully' }));
      }
    });
  }
}

function handleGetUsers(req, res) {
  validateApiKey(req, res);
  const users = getUsersFromFile().users;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
}

module.exports = { handleAddUser, handleGetUsers };
