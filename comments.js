// Create web server
// Create a web server that listens for HTTP requests on port 3000.
// When a request is received, the server should read the comments.json file and respond with its contents. The server should only respond to GET requests.
// The server should respond with a 200 status code and the following headers:
// Content-Type: application/json
// Access-Control-Allow-Origin: *
// If the file cannot be read, the server should respond with a 500 status code and the following headers:
// Content-Type: text/plain
// Access-Control-Allow-Origin: *
// The server should not crash when an error occurs.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
        });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});