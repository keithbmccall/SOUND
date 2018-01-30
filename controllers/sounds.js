const router = require("express").Router();
const sounds = require("../models/sounds");
const auth = require('../services/auth');

router.get("/", auth.restrict, sounds.allPreSongs, (req, res, next) => {
    res.render("index", {
        allDoomSongs: res.locals.allDoomData,
        allViktorSongs: res.locals.allViktorData,
        allDangerSongs: res.locals.allDangerData,
        allKingSongs: res.locals.allKingData,
        allJJSongs: res.locals.allJJData,
        user: req.user
    });
});
router.get('/search/results', auth.restrict, sounds.searchedSongs, (req, res, next) => {
    res.render("search", {
        searchedSongs: res.locals.searchedSongs,
        user: req.user
    });

});

router.get("/browse/:trackId", auth.restrict, sounds.specificSong, (req, res, next) => {
    console.log(res.locals.specificSong)
    res.render("choose", {
        song: res.locals.specificSong,
        user: req.user
    })

})
router.get("/library", auth.restrict, sounds.allLibrary, (req, res, next) => {
    console.log(res.locals.allLibrary);
    console.log(req.user);
    res.render("library", {
        allLibrary: res.locals.allLibrary,
        user: req.user
    })
})
router.post("/browse/:trackId", auth.restrict, sounds.saveSong, (req, res, next) => {
    res.json(res.locals.library)
})
router.get("/library/:trackId", auth.restrict, sounds.specificSong, (req, res, next) => {
    console.log(res.locals.specificSong)
    res.render("songpage", {
        song: res.locals.specificSong,
        user: req.user
    })
})
router.get('/account', auth.restrict, (req, res, next) => {
    res.render("users/profile", {
        user: req.user
    });

});
router.get('/account/edit', auth.restrict, (req, res, next) => {
    res.render("users/edit", {
        user: req.user
    });
});
router.put('/account/edit', auth.restrict, sounds.updateAccountInfo, (req, res, next) => {
    res.json(res.locals.updatedUserData);
});


module.exports = router;