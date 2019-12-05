const bot = require("../bot");

module.exports = () => {
	return bot.guilds.array().sort((a, b) => a.position - b.position);
}