const http = require('http');
const { handleAddUser, handleGetUsers } = require('./user')

const server = http.createServer((req, res) => {
  if (req.url === '/addUsers' && req.method === 'POST') {
    handleAddUser(req, res);
  } else if (req.url === '/listUsers' && req.method === 'GET') {
    handleGetUsers(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('error: not found');
  }
});


server.listen(3000, () => {
  console.log(`Server running on port 3000...`);
});

