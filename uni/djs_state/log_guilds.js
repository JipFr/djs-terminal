
const bot = require("../bot");
const state = require("./state");
const get_guilds = require("./get_guilds");

module.exports = () => {
	state.mapped_guilds = {}
	get_guilds().forEach((guild, index) => {
		state.mapped_guilds[index] = guild;
		console.log(`${index.toString().padStart(3, " ").bold.green} ${guild.name}`);
	});
}