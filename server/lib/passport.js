const httpErrors = require("http-errors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
	getByUsername,
	USER_WITH_CREDENTIAL_PROJECTIONS,
} = require("../stores/user");

initLoginStrategies();

exports.initialize = function () {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	return passport.initialize();
};

exports.session = function () {
	return passport.session();
};

exports.authenticateManagementCredentials = function (req, res, next) {
	const cb = function (error, user, info) {
		if (error) {
			return next(error);
		}
		if (!user) {
			next(httpErrors(401, info));
		}
		const { id, type, username } = user;

		req.logIn({
			id,
			username,
			type,
		}, function (error) {
			if (error) {
				return next(error);
			}

			next();
		});
	};

	return passport.authenticate("password", cb)(req, res, next);
};

function initLoginStrategies() {
	passport.use("password", new LocalStrategy(
		async function (username, password, done) {
			try {
				const user = await getByUsername(username, { projections: USER_WITH_CREDENTIAL_PROJECTIONS });

				if (!user) {
					return done(null, false, { message: "invalid username/password" });
				}

				if (!user.validPassword(password)) {
					return done(null, false, { message: "invalid username/password" });
				}
				const returnedUser = {
					id: user.id,
					username: username,
					type: user.type,
				};

				return done(null, returnedUser);

			} catch (error) {
				return done(error);
			}
		}
	));
}
