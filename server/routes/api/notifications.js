const express = require("express");
const { UniqueConstraintError } = require("sequelize");
const httpErrors = require("http-errors");
const router = express.Router();
const { common, validateResult } = require("../../middlewares/validators");
const Notification = require("../../stores/notification");

router.get("/",
	async (req, res, next) => {
		try {
			const { id } = req.user;
			const notifications = await Notification.getAllByUserId(id);

			res.json(notifications);
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});

router.get("/:id",
	[
		common.checkIdInParam,
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { id: userId } = req.user;
			const { id } = req.params;
			const notification = await Notification.getByIdAndUserId(id, userId);

			if (!notification) {
				return next(httpErrors(404));
			}

			res.json(notification);
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});


router.put("/",
	[
		// TODO: validate
		// TODO: validate options by im_type
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { id: user_id } = req.user;
			const {
				im_type,
				token,
				options,
			} = req.body;
			const notification = await Notification.upsert({
				im_type,
				token,
				options,
				user_id
			});

			res.status(201).json(notification);
		} catch (error) {
			if (error instanceof UniqueConstraintError) {
				return next(httpErrors(409, error.original.message));
			}

			next(httpErrors(500, error.message));
		}
	});

module.exports = router;
