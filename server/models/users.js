//from classroom demonstration-
const bcrypt = require("bcryptjs");

const db = require("../db/index.js");

const userModelObject = {};
let theUser;

userModelObject.create = function create(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 10);

    return db.oneOrNone(
        "INSERT INTO users (fname, lname, email, password_digest, username) VALUES ($1, $2, $3,$4,$5) RETURNING *;",
        [user.fname, user.lname, user.email, passwordDigest, user.username]
    );
};

userModelObject.findByEmail = function findByEmail(email) {
    return db.oneOrNone("SELECT * FROM users WHERE email = $1;", [email]);
};

userModelObject.findByEmailMiddleware = function findByEmailMiddleware(
    req,
    res,
    next
) {
    console.log("in findByEmailMiddleware");
    const email = req.user.email;
    userModelObject
        .findByEmail(email) 
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log("ERROR:", err));
};

module.exports = userModelObject;
