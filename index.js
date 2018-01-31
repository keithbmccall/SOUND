const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 7500;

const mustacheExpress = require('mustache-express');

// registers the template engine for use in res.render
app.engine('html', mustacheExpress());
// sets the file extension to use for views when the file extension is omitted
app.set('view engine', 'html');
// sets the the directory that will contain our mustache template files, or "views"
app.set('views', __dirname + '/views');
// sets the directory that will contain our static (not generated on the fly) resources, such as css, client-side Javascript files, and images
app.use(express.static(__dirname + '/public'));

// set up session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// ====================================================================
// PASSPORT STUFF
//const passport = require('passport');
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// END PASSPORT STUFF
// ====================================================================


// morgan setup
app.use(morgan('dev'));

// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.listen(port, () => { console.log("Server started on " + port); });


const soundsRouter = require('./controllers/sounds.js');

// hook it up to the app
app.use('/sounds', soundsRouter);

const userRouter = require('./controllers/users.js');
app.use('/users', userRouter);

// Set up error handling middleware (notice that this is the LAST thing we do)
app.use((err, req, res, next) => {
    console.log('Error encountered:', err);
    res.status(500);
    res.send(err);
});