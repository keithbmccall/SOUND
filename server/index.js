require("dotenv").config();
const app = express();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const tokenService = require("./services/TokenService");
const userRouter = require("./controllers/users");
const authService = require("./services/AuthService");
const path = require("path");

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(tokenService.receiveToken);
app.use(express.static(__dirname + "/public/build"));

app.use(bodyParser.urlencoded({ extended: false }));

const soundsRoutes = require("./controllers/sounds.js");
app.use("/api/sounds", soundsRoutes);

app.use("/users", userRouter);

app.get("/isLoggedIn", authService.isLoggedIn, (req, res) => {
	res.json({
		isLoggedIn: res.locals.isLoggedIn,
		user: res.locals.user
	});
});
//
const PORT = process.env.PORT || 7000;
app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/build/index.html"));
});
