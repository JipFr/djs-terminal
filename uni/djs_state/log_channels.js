
const bot = require("../bot");
const state = require("./state");
const get_channels = require("./get_channels");

module.exports = () => {
	state.mapped_channels = {}
	let index = 0;
	get_channels().cats.forEach(category => {
		console.log(`${">".bold.yellow} ${category.name}`);
		category.channels.forEach(channel => {
			if(channel.type == "text") {
				let highlight = state.pings[channel.guild.id] && state.pings[channel.guild.id][channel.id];
				console.log(`${index.toString().padStart(5, " ").bold[highlight ? "red" : "green"]} ${channel.name}`)
				state.mapped_channels[index] = channel;
				index++
			} else {
				console.log(`${"🔊".padStart(5, " ").bold.green} ${channel.name}`)
			}
		});
	});
}