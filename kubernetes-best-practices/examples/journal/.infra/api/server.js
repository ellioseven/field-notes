const http = require('http');
const redis = require('redis');
const fs = require('fs');

const client = redis.createClient({
  'host': 'redis',
  'password': fs.readFileSync("/etc/redis-passwd/passwd")
});

const port = 8080;

const requestHandler = (request, response) => {
  console.log(request.url);
  if (!request.url.startsWith('/api')) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  if (request.method != 'GET' && request.method != 'POST') {
    response.writeHead(400);
    response.end('Unsupported method.');
    return;
  }
  const key = 'journal-key';
  client.get(key, (err, value) => {
    if (err) {
      response.writeHead(500);
      response.end(err.toString());
      return;
    }
    var journals = [];
    if (value) {
      journals = JSON.parse(value);
    }
    if (request.method == 'GET') {
      response.writeHead(200);
      response.end(JSON.stringify(journals));
    }
    if (request.method == 'POST') {
      try {
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          const msg = JSON.parse(body);
          journals.push(msg);
          client.set(key, JSON.stringify(journals));
          response.writeHead(200);
          response.end(JSON.stringify(journals));
        });
      } catch (err) {
        response.writeHeader(500);
        response.end(err.toString());
        return;
      }
    }
  });
  return;
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('could not start server', err);
  }

  console.log('api server up and running.');
})
