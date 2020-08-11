const express = require("express");
const { UniqueConstraintError } = require("sequelize");
const httpErrors = require("http-errors");
const router = express.Router();
const { user, common, validateResult } = require("../../middlewares/validators");
const checkUserRole = require("../../middlewares/checkUserRole");
const { USER_TYPE } = require("../../enum");
const User = require("../../stores/user");

router.get("/",
	checkUserRole([USER_TYPE.ADMIN]),
	[
		common.checkPage,
		common.checkLimit,
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { limit, page } = req.query;
			const users = await User.getAll(page, limit, { projections: User.USER_PROJECTIONS });

			res.json(users);
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});

router.get("/:id",
	checkUserRole([USER_TYPE.ADMIN]),
	[
		common.checkIdInParam,
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await User.getById(id, { projections: User.USER_PROJECTIONS });

			if (!user) {
				return next(httpErrors(404));
			}

			res.json(user);
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});


router.post("/",
	checkUserRole([USER_TYPE.ADMIN]),
	[
		user.checkUsername,
		user.checkPassword,
		// TODO: check type
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { username, password, type } = req.body;
			let user = await User.create({ username, password, type });

			user = user.toJSON();
			delete user.password;

			res.status(201).json(user);
		} catch (error) {
			if (error instanceof UniqueConstraintError) {
				return next(httpErrors(409, error.original.message));
			}

			next(httpErrors(500, error.message));
		}
	});

router.patch("/:id",
	[
		common.checkIdInParam,
		validateResult,
	],
	(req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;

		if (id == userId) {
			return next();
		}

		return next(httpErrors(403));
	},
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const { oldPassword, password } = req.body;
			const ok = await User.updatePassword(id, oldPassword, password);

			if (!ok) {
				return next(httpErrors(404));
			}

			res.status(204).end();
		} catch (error) {
			if (error instanceof httpErrors.Unauthorized) {
				return next(error);
			}

			next(httpErrors(500, error.message));
		}
	});

module.exports = router;
