
const { get_channels, get_message_text } = require("./gets");

function log_guild(djs_state) {
	console.log("Selected guild:".bold.yellow, djs_state.guild.name);
}
function log_channel(bot, djs_state) {

	console.log("Current channel:".bold.yellow, djs_state.guild.name, "—".bold.yellow, djs_state.channel.name);
	djs_state.channel.fetchMessages({limit: 100}).then(d => {
		let messages = d.array().reverse().map(msg => get_message_text(msg, bot, djs_state));
		messages.forEach(txt => console.log(txt));
		console.log("—".repeat(90).bold.green);
	});

}
function log_channels(bot, djs_state) {
	mapped_channels = {}
	let channels = get_channels(bot, djs_state);

	let mapped_cats = channels.filter(channel => channel.type == "category")
		.sort((a, b) => a.position - b.position)
		.map(ch => ({ id: ch.id, name: ch.name, channels: [] }));

	channels.filter(channel => channel.type == "text").forEach(channel => {
		let cat = mapped_cats.find(cat => cat.id == channel.parentID);
		if(cat) cat.channels.push(channel);
	});

	let index = 0;
	mapped_cats.forEach(category => {
		console.log(">".bold.yellow, category.name);
		category.channels.forEach(channel => {
			mapped_channels[index] = channel;
			console.log(index.toString().padStart(5, " ").bold.green, channel.name.padEnd(48, " "), channel.id.dim.white);
			index++
		});
	});
}
module.exports = {
	log_channels,
	log_channel,
	log_guild
}