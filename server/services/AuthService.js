const bcrypt = require("bcrypt");
const TokenService = require("./TokenService");
const user = require("../models/users");

function restrict() {
  return [
    (req, res, next) =>
      TokenService.verify(req.authToken)
        .then(data => {
          next();
        })
        .catch(next), // a little goofy but next() is getting called with an error object

    (err, req, res, next) => {
      console.log(`err: ${err}`);
      res.status(401).json({});
    }
  ];
}

function isLoggedIn(req, res, next) {
  TokenService.verify(req.authToken)
    .then(data => {
      console.log("IS isLoggedIn", data);
      res.locals.isLoggedIn = "YES";
      res.locals.user = data;
      next();
    })
    .catch(err => {
      res.locals.isLoggedIn = "NO";
      next();
    });
}

module.exports = {
  restrict,
  isLoggedIn
};
