const axios = require("axios");
const db = require("../db/index.js");
const userData = require("./users.js");
const GoogleNewsRss = require("google-news-rss");
const googleNews = new GoogleNewsRss();
const p4k = require("pitchfork");
const s = new p4k.Search();

const sounds = {};

//pre fill with some popular songs
sounds.allPreSongs = (req, res, next) => {
    var bruno = axios({
        method: "get",
        url:
            "https://itunes.apple.com/search?term=bruno+mars&limit=4&entity=song&sort=recent"
    });
    var kendrick = axios({
        method: "get",
        url:
            "https://itunes.apple.com/search?term=kendrick+lamar&limit=4&entity=song&sort=recent"
    });
    var cara = axios({
        method: "get",
        url:
            "https://itunes.apple.com/search?term=alessia+cara&limit=4&entity=song&sort=recent"
    });
    var lorde = axios({
        method: "get",
        url:
            "https://itunes.apple.com/search?term=lorde&limit=4&entity=song&sort=recent"
    });
    Promise.all([bruno, kendrick, cara, lorde])
        .then(response => {
            res.locals.allBrunoData = response[0].data.results;
            res.locals.allKendrickData = response[1].data.results;
            res.locals.allCaraData = response[2].data.results;
            res.locals.allLordeData = response[3].data.results;
            res.locals.test = response[4];
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.allSongs:", err);
        });
};
sounds.searchedSongs = (req, res, next) => {
    // const search = req.query.search;
    axios({
        method: "get",
        url: `https://itunes.apple.com/search?term=${
            req.query.search
        }&limit=200`
    })
        .then(response => {
            res.locals.searchedSongs = response.data.results;
            console.log(res.locals.searchedSongs);
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.searchedSongs:", err);
        });
};

sounds.specificSong = (req, res, next) => {
    const trackId = req.params.trackId;
    axios({
        method: "get",
        url: `https://itunes.apple.com/search?term=${trackId}`
    })
        .then(response => {
            res.locals.specificSong = response.data.results[0];
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.specificSong:", err);
        });
};

sounds.saveSong = (req, res, next) => {
    db
        .none(
            "INSERT INTO sounds (name, artist, image, itunes_track_id, album, preview, genre, user_id, comments) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);",
            [
                req.body.name,
                req.body.artist,
                req.body.image,
                req.body.trackId,
                req.body.album,
                req.body.preview,
                req.body.genre,
                req.body.userId,
                ""
            ]
        )
        .then(data => {
            res.locals.library = data;
            next();
        })
        .catch(error => {
            console.log("error encountered in sounds.saveSong. Error:", error);
            next(error);
        });
};
sounds.allLibrary = (req, res, next) => {
    db
        .manyOrNone(
            // "SELECT * FROM sounds JOIN users ON sounds.user_id = users.id WHERE users.username = $1;",
            "SELECT * FROM sounds WHERE sounds.user_id = $1;",
            [req.user.id]
        )
        .then(data => {
            console.log(data);
            res.locals.allLibrary = data.sort((a, b) => {
                if (a.artist < b.artist) {
                    return -1;
                } else if (a.artist > b.artist) {
                    return 1;
                } else {
                    return 0;
                }
            });
            next();
        })
        .catch(error => {
            console.log(
                "error encountered in sounds.allLibrary. Error:",
                error
            );
            next(error);
        });
};
sounds.updateAccountInfo = (req, res, next) => {
    db
        .one(
            "UPDATE users SET fname = $1, lname = $2, username = $3, email = $4 WHERE id = $5 RETURNING *;",
            [
                req.body.fname,
                req.body.lname,
                req.body.username,
                req.body.email,
                req.body.userId
            ]
        )
        .then(data => {
            res.locals.updatedUserData = data;
            next();
        })
        .catch(error => {
            console.log(
                "error encountered in sounds.updateAccountInfo Error:",
                error
            );
            next(error);
        });
};

sounds.deleteSong = (req, res, next) => {
    db
        .none("DELETE FROM sounds WHERE id = $1", [req.body.songId])
        .then(data => {
            res.locals.deleted = data;
            next();
        })
        .catch(error => {
            console.log("error encountered in sounds.deleteSong error:", error);
            next(error);
        });
};
sounds.updateComment = (req, res, next) => {
    db
        .one("UPDATE sounds SET comments = $1 WHERE id = $2", [
            req.body.comments,
            req.body.songId
        ])
        .then(data => {
            res.locals.comments = data;
            next();
        })
        .catch(error => {
            console.log(
                "error encountered in sounds.updateComment error:",
                error
            );
            next(error);
        });
};
sounds.librarySong = (req, res, next) => {
    console.log("***ooo*** ", req.params.trackId);
    db
        .manyOrNone(
            "SELECT * FROM sounds WHERE sounds.user_id = $1 AND sounds.itunes_track_id = $2;",
            [req.user.id, req.params.trackId]
        )
        .then(data => {
            res.locals.librarySong = data[0];
            next();
        })
        .catch(err => {
            console.log("error encountered in sounds.librarySong error:", err);
            next(err);
        });
};
sounds.renderNews = (req, res, next) => {
    const artist = req.params.artistName;
    const s = new p4k.Search(`${artist}`);

    googleNews
        .search(`${artist} music`)
        .then(response => {
            res.locals.reviews = s;
            res.locals.news = response;
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.renderNews:", err);
        });
};

module.exports = sounds;

//
