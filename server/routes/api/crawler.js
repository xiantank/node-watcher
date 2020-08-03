const express = require("express");
const { UniqueConstraintError } = require("sequelize");
const httpErrors = require("http-errors");
const router = express.Router();
const { common, validateResult } = require("../../middlewares/validators");
const Crawler = require("../../stores/crawler");

router.get("/",
	async (req, res, next) => {
		try {
			const { id } = req.user;
			const crawlers = await Crawler.getAllByUserId(id);

			res.json(crawlers);
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
			const crawler = await Crawler.getByIdAndUserId(id, userId);

			if (!crawler) {
				return next(httpErrors(404));
			}

			res.json(crawler);
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});


router.post("/",
	[
		// TODO: validate
		validateResult,
	],
	async (req, res, next) => {
		try {
			const {
				name, interval_type, url,
				parser, parse_attributes,
				target, compare_type,
				user_id,
			} = req.body;
			const crawler = await Crawler.create({
				name, interval_type, url,
				parser, parse_attributes,
				target, compare_type,
				user_id,
			});

			res.status(201).json(crawler);
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
		// TODO: check crawler.intervalType
		validateResult,
	],
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const { id: userId } = req.user;
			const { interval_type } = req.body;
			const ok = await Crawler.updateIntervalTypeByIdAndUserId(id, userId, interval_type);

			if (!ok) {
				return next(httpErrors(404));
			}

			res.status(204).end();
		} catch (error) {
			next(httpErrors(500, error.message));
		}
	});

module.exports = router;
