// server.mjs
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

const html = await readFile('./index.html');
const json = await readFile('./games.json');

const server = createServer(async (req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return
  }

  if (url === '/games') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(json);
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`