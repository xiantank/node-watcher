const path = require("path");
const httpErrors = require("http-errors");
const express = require("express");
const morgan = require("morgan");

const app = express();
const cookieParser = require("cookie-parser");
const session = require("./session");
const passport = require("./lib/passport");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	secret: process.env.SESSION_SECRET,
}));


app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", require("./routes/api/index.v1"));

app.use(function(req, res, next) {
	next(httpErrors(404));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
	res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
