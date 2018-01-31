const bcrypt = require('bcryptjs');

const db = require('../db/index.js');

const userModelObject = {};
var theUser;
// Note that this is NOT middleware!
userModelObject.create = function create(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 10);
    // Generally we try to avoid passing promises around, but here 
    // LocalStrategy's interface means we can't just rely on next() 
    // to glide us to the next thing we want to do. So we'll return the callback.
    // To see how it's used, see passport.use('local-strategy', ...) in services/auth.js
    // Anyway, here we make an entry in the database for the new user. We set the counter to 0 initially.
    // We do NOT store the password in the database!
    // Instead we store the password digest, which is a salted hash of the password.
    // If someone grabs the password digest it won't tell them what the password is,
    // but we can use the password digest to verify if a submitted password is correct.
    // This is the magic of hashes.
    return db.oneOrNone(
        'INSERT INTO users (fname, lname, email, password_digest, username) VALUES ($1, $2, $3,$4,$5) RETURNING *;', [
            user.fname,
            user.lname,
            user.email,
            passwordDigest,
            user.username
        ]
    );
};

// Here's a tricky part.
// We need both a middleware _and_ a nonmiddleware version 
// (nonmiddleware for use in services/auth.js).

// Again, LocalStrategy's interface means it's easiest to return a promise here.
userModelObject.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

userModelObject.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    console.log('in findByEmailMiddleware');
    const email = req.user.email;
    userModelObject
        .findByEmail(email) // here we're using the nonmiddleware version above, getting back a promise
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};

// This section just demonstrates that we can build middleware for the user model 
// and talk to the database as usual. 
// Note that we now have access to req.user for user information, thanks to passport.

module.exports = userModelObject;