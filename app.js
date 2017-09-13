/**
 * Created by fucho on 9/11/17.
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    homeRoute(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function homeRoute(request, response) {
    // response.statusCode = 200;
    if (request.url === '/') {
        response.setHeader('Content-Type', 'text/plain');
        response.write('Header\n');
        response.write('Search\n');
        response.end('Footer\n');
    }
}

function userRoute(request, response) {
    let username = request.url.replace('/', '');

    if (username.length > 0) {
        response.setHeader('Content-Type', 'text/plain');
        response.write('Header\n');
        response.write(`${username}\n`);
        response.end('Footer\n');
    }
}