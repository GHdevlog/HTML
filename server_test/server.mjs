// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

  console.log(req.url)

  if (req.url == '/'){
    res.end('<h1>Hello World!</h1>\n');
  }else if (req.url == '/news'){
    res.end('<h1>News World!</h1>\n');
  }

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
