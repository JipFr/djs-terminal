
const { log_channels, log_guild } = require("../logs");
const { ask } = require("../ask");

module.exports = async (bot, djs_state) => {
	log_channels(bot, djs_state);
	let channel_to_pick = await ask("ID ".bold.yellow);
	let relevant;
	if(!isNaN(Number(channel_to_pick))) {
		relevant = mapped_channels[Number(channel_to_pick)];
	} else {
		relevant = djs_state.guild.channels.array().filter(ch => ch.type == "text").find(ch => ch.name.toLowerCase() == channel_to_pick.toLowerCase());
	}
	return relevant ? relevant : await prompt_channel();
}