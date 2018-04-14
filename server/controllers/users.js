//from classroom demonstration- there are a few modifications made
const user = require("../models/users");
const router = require("express").Router();
const TokenService = require("../services/TokenService");

// ----------------------------------------
// users index

router.get("/", (req, res) => {
    res.json({ user: "it worked" });
});

// note how res.locals is returned in both creating a user and logging in
router.post("/", user.create, (req, res) => {
    res.json({ token: res.locals.token, user: res.locals.user });
});

// if the user didn't get created thrown an error
// else include the user and token in the response
router.post("/login", user.login, (req, res) => {
    if (!res.locals.user) {
        res.status(401).json({ err: "Login Failed" });
    } else {
        const { password_digest, ...user } = res.locals.user;
        res.json({ token: res.locals.token, user });
    }
});

module.exports = router;
