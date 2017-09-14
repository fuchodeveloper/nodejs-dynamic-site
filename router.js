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
        // response.setHeader('Content-Type', 'text/plain');
        response.writeHead(200, {'Content-Type': 'text/plain'}); 
        response.write('Header\n');

        let studentProfile = new Profile(username);
        studentProfile.on('end', function(profileJSON) {
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            response.write(`${values.username} has ${values.badges} badges\n`);
            response.end('Footer\n');
        });

        studentProfile.on('error', (error) => {
            response.write(`${error.message}\n`);
            response.end('Footer\n');
        });
    }
}

module.exports.home = home;
module.exports.user = user;
