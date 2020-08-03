const ServiceLocator = require("../service-loactor");
const {
	IM_TYPE,
} = require("../../enum");

const imService = new ServiceLocator();

imService.add(IM_TYPE.TELEGRAM, require("./telegram"));
imService.add(IM_TYPE.TELEGRAM_DEFAULT, require("./telegramDefault"));

module.exports = imService;
