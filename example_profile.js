let Profile = require('./profile.js');

let studentProfile = new Profile('chalkers');

studentProfile.on('end', console.dir);

studentProfile.on('error', console.error);