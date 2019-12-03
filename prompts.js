const { get_guilds } = require("./gets.js");
const { ask } = require("./ask");
const { log_channels, log_guild } = require("./logs");

const prompt_guild = async bot => {
	let guild_names = bot.guilds.array().map(guild => guild.name);
	log_guilds(bot);
	let guild_to_pick = await ask("ID ".bold.yellow);
	let relevant;
	if(!isNaN(Number(guild_to_pick))) {
		relevant = mapped_guilds[Number(guild_to_pick)];
	} else {
		relevant = bot.guilds.array().find(guild => guild.name.toLowerCase() == guild_to_pick.toLowerCase());
	}
	return relevant ? relevant : await prompt_guild();
}

const prompt_channel = async (bot, djs_state) => {
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

module.exports = {
	prompt_guild,
	prompt_channel
}

function log_guilds(bot) {
	mapped_guilds = {}
	let guilds = get_guilds(bot);
	guilds.forEach((guild, index) => {
		mapped_guilds[index] = guild;
		console.log(index.toString().bold.green, guild.name);
	});
}