
const fs = require("fs");

const bot = require("../bot");
const ask = require("../ask");
const state = require("./state");
const get_guilds = require("./get_guilds");
const log_guilds = require("./log_guilds");
const freq = require("../../guild_freq");

const prompt_guild = async () => {

	state.show_messages = false;
	
	log_guilds();

	let answer = await ask("ID ".bold.yellow);
	let relevant_guild = state.mapped_guilds[answer];
	if(!relevant_guild) relevant_guild = get_guilds().find(guild => guild.name.toLowerCase() == answer.toLowerCase());
	if(relevant_guild) {

		if(!freq[relevant_guild.id]) {
			freq[relevant_guild.id] = 0;
		}

		freq[relevant_guild.id]++;
		fs.writeFileSync("../../guild_freq.json", JSON.stringify(freq));

		state.show_messages = true;
		return relevant_guild;
	}
	return await prompt_guild();

}

module.exports = prompt_guild;