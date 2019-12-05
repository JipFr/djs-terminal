
const bot = require("../bot");
const state = require("./state");
const get_guilds = require("./get_guilds");

module.exports = () => {
	state.mapped_guilds = {}
	const guilds = get_guilds();
	guilds.forEach((guild, index) => {
		state.mapped_guilds[index] = guild;
	});
	Object.entries(state.mapped_guilds).reverse().forEach(entry => {
		console.log(`${entry[0].toString().padStart(3, " ").bold.green} ${entry[1].name}`);
	});
}