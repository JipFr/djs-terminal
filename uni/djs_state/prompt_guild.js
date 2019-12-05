
const bot = require("../bot");
const ask = require("../ask");
const state = require("./state");
const get_guilds = require("./get_guilds");
const log_guilds = require("./log_guilds");

const prompt_guild = async () => {
	
	log_guilds();

	let answer = await ask("ID ".bold.yellow);
	let relevant_guild = state.mapped_guilds[answer];
	if(!relevant_guild) relevant_guild = get_guilds().find(guild => guild.name.toLowerCase() == answer.toLowerCase());
	
	return relevant_guild ? relevant_guild : await prompt_guild();
}

module.exports = prompt_guild;