
const bot = require("../bot");
const ask = require("../ask");
const state = require("./state");
const get_channels = require("./get_channels");
const log_channels = require("./log_channels");

const prompt_channel = async () => {
		
	state.show_messages = false;

	log_channels();

	let answer = await ask("ID ".bold.yellow);
	let relevant_channel = state.mapped_channels[answer];
	if(!relevant_channel) relevant_channel = get_channels().all.filter(ch => ch.type == "text").find(channel => channel.name.toLowerCase() == answer.toLowerCase());
	
	if(relevant_channel) {
		state.show_messages = true;
		return relevant_channel
	}
	return await prompt_channel();
}

module.exports = prompt_channel;