let Profile = require('./profile.js');

function home(request, response) {
    // response.statusCode = 200;
    if (request.url === '/') {
        response.setHeader('Content-Type', 'text/plain');
        response.write('Header\n');
        response.write('Search\n');
        response.end('Footer\n');
    }
}

function user(request, response) {
    let username = request.url.replace('/', '');

    if (username.length > 0) {
        response.setHeader('Content-Type', 'text/plain');
        response.write('Header\n');

        let studentProfile = new Profile('chalkers');
        studentProfile.on('end', function(profileJSON) {

        });

        response.write(`${username}\n`);
        response.end('Footer\n');
    }
}

module.exports.home = home;
module.exports.user = user;
