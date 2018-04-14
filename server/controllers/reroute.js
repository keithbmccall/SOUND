const router = require("express").Router();
const sounds = require("../models/sounds");
const auth = require('../services/auth');

router.get('/', (req, res, next) => {
    res.redirect('/sounds/library');
});
module.exports = router;