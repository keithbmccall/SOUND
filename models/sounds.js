const axios = require('axios');
const db = require("../db/index.js");

const sounds = {};


sounds.allPreSongs = (req, res, next) => {
    var doom = axios({
        method: "get",
        url: "https://itunes.apple.com/search?term=mf+doom&limit=250&entity=song&sort=recent"
    });
    var viktor = axios({
        method: "get",
        url: "https://itunes.apple.com/search?term=viktor+vaughn&limit=250&entity=song&sort=recent"
    });
    var danger = axios({
        method: "get",
        url: "https://itunes.apple.com/lookup?id=1158467280&limit=250&entity=song"
    });
    var king = axios({
        method: "get",
        url: "https://itunes.apple.com/search?term=king+geedorah&limit=250&entity=song&sort=recent"
    });
    var jj = axios({
        method: "get",
        url: "https://itunes.apple.com/search?term=jj+doom&limit=250&entity=song&sort=recent"
    });

    Promise.all([doom, viktor, danger, king, jj])
        .then(response => {
            res.locals.allDoomData = response[0].data.results;
            res.locals.allViktorData = response[1].data.results;
            res.locals.allDangerData = response[2].data.results;
            res.locals.allKingData = response[3].data.results;
            res.locals.allJJData = response[4].data.results;
            next();
        })
        .catch(err => {
            console.log(
                "Error encountered in sounds.allSongs:",
                err
            );
        });

};
sounds.searchedSongs = (req, res, next) => {
    // const search = req.query.search;
    axios({
            method: 'get',
            url: `https://itunes.apple.com/search?term=${req.query.search}`,
        })
        .then(response => {
            res.locals.searchedSongs = response.data.results;
            console.log(res.locals.searchedSongs)
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.searchedSongs:",
                err
            );
        })
}


sounds.specificSong = (req, res, next) => {
    const trackId = req.params.trackId;
    axios({
            method: 'get',
            url: `https://itunes.apple.com/search?term=${trackId}`,
        })
        .then(response => {
            res.locals.specificSong = response.data.results[0];
            next();
        })
        .catch(err => {
            console.log("Error encountered in sounds.specificSong:",
                err
            );
        })

};

sounds.saveSong = (req, res, next) => {
    console.log("****: ", req.body)
    db
        .none(
            "INSERT INTO sounds (name, artist, image, itunes_track_id, user_id) VALUES ($1,$2,$3,$4,$5);", [
                req.body.name,
                req.body.artist,
                req.body.image,
                req.body.trackId,
                req.body.userId
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
}
sounds.allLibrary = (req, res, next) => {
    db
        .manyOrNone("SELECT * FROM sounds WHERE user_id = $1;", [
            req.params.id

        ])
        .then(data => {
            res.locals.allLibrary = data;
            next();
        })
        .catch(error => {
            console.log("error encountered in sounds.allLibrary. Error:", error);
            next(error);
        });
}
sounds.updateAccountInfo = (req, res, next) => {
    db
        .one(
            "UPDATE users SET fname = $1, lname = $2, username = $3, email = $4 WHERE id = $5 RETURNING *;", [
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
            console.log("error encountered in sounds.updateAccountInfo Error:", error);
            next(error);
        });
}







// beers.create = (req, res, next) => {
//     db
//         .one(
//             "INSERT INTO beers (name, category, country, alcohol, price) VALUES ($1, $2, $3, $4, $5) RETURNING id;", [
//                 req.body.name,
//                 req.body.category,
//                 req.body.country,
//                 req.body.alcohol,
//                 req.body.price
//             ]
//         )
//         .then(data => {
//             res.locals.newBeerId = data.id;
//             next();
//         })
//         .catch(error => {
//             console.log("error encountered in beers.create. Error:", error);
//             next(error);
//         });
// };

// beers.destroy = (req, res, next) => {
//     db
//         .none("DELETE FROM beers WHERE id = $1", [req.params.beerId])
//         .then(() => {
//             next();
//         })
//         .catch(error => {
//             console.log("error encountered in beers.destroy. error:", error);
//             next(error);
//         });
// };

// beers.update = (req, res, next) => {
//     db
//         .one(
//             "UPDATE beers SET name = $1, category = $2, country = $3, alcohol = $4, price = $5 WHERE id = $6 RETURNING *;", [
//                 req.body.name,
//                 req.body.category,
//                 req.body.country,
//                 req.body.alcohol,
//                 req.body.price,
//                 req.params.beerId
//             ]
//         )
//         .then(data => {
//             res.locals.updatedBeerData = data;
//             next();
//         })
//         .catch(error => {
//             console.log("error encountered in beers.update. Error:", error);
//             next(error);
//         });
// };

module.exports = sounds;