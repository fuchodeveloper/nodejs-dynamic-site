let Profile = require('./profile.js');
let renderer = require('./renderer.js');
let commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {
    // response.statusCode = 200;
    if (request.url === '/') {
        if (request.method.toLowerCase() === '') {
            response.writeHead(200, commonHeaders);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {}
    }
}

function user(request, response) {
    let username = request.url.replace('/', '');

    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);

        let studentProfile = new Profile(username);
        studentProfile.on('end', function(profileJSON) {
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }
            // response.write(`${values.username} has ${values.badges} badges\n`);
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        studentProfile.on('error', (error) => {
            renderer.view('error', { errorMessage: error.message }, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);

            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;
