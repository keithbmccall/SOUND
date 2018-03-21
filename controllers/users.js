//from classroom demonstration- there are a few modifications made
const User = require("../models/users");
const router = require("express").Router();
const passport = require("passport");

const auth = require("../services/auth");

// ----------------------------------------
// users index

router.get("/", (req, res, next) => {
    res.redirect("/sounds/library");
});

router.post(
    "/",

    passport.authenticate("local-signup", {
        failureRedirect: "/users/register",
        successRedirect: "/sounds/library"
    })
);

// ----------------------------------------
// register new user

router.get("/register", (req, res) => {
    res.render("users/register");
});

// ----------------------------------------
// user logout

router.get("/logout", (req, res) => {
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect("/users/login");
});

// ----------------------------------------
// user login

router.get("/login", (req, res) => {
    res.render("users/login");
});

// passport.authenticate will _build_ middleware for us
// based on the 'local-login' strategy we registered with
// passport in auth.js

router.post(
    "/login",
    passport.authenticate("local-login", {
        failureRedirect: "/users/login",
        successRedirect: "/sounds/library"
    })
);

// ----------------------------------------
// user profile

router.get(
    "/profile",
    // Middleware ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    User.findByEmailMiddleware,
    (req, res) => {
        console.log("in handler for users/profile");
        console.log("req.user:");
        console.log(req.user);
        res.render("library", { user: res.locals.userData });
    }
);

module.exports = router;
