
const bot = require("../bot");
const state = require("./state");
const get_channels = require("./get_channels");

module.exports = () => {
	state.mapped_channels = {}
	let index = 0;
	get_channels().cats.forEach(category => {
		console.log(`${">".bold.yellow} ${category.name}`);
		category.channels.forEach(channel => {
			console.log(`${index.toString().padStart(5, " ").bold.green} ${channel.name}`)
			state.mapped_channels[index] = channel;
			index++
		});
		// console.log(`${index.toString().padStart(3, " ").bold.green} ${channel.name}`);
	});
}