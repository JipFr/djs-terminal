const bot = require("../bot");
const freq = require("../../guild_freq.json");

module.exports = () => {
	return bot.guilds.array()
	.sort((a, b) => b.position - a.position)
	.sort((a, b) => (freq[a.id] || 0) - (freq[b.id] || 0))
	.reverse();
}