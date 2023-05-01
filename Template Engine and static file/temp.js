const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const data = JSON.parse(fs.readFileSync('users.json'));
const template = fs.readFileSync('temp.ejs', 'utf-8');

const server = http.createServer((req, res) => {
  if (req.url === "/userdata" && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const output = ejs.render(template, { data });
    res.end(output);
  }
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});



