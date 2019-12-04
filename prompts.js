const { get_guilds } = require("./gets.js");
const { ask } = require("./ask");
const { log_channels, log_guild } = require("./logs");
const freq = require("./logs/freq.json");
const fs = require("fs");

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
	if(relevant) {
		if(!freq[relevant.id]) {
			freq[relevant.id] = 0;
		}
		freq[relevant.id]++
		fs.writeFileSync("logs/freq.json", JSON.stringify(freq, null, "\t"));
		return relevant;
	} else {
		return await prompt_guild(bot);
	}
	// return relevant ? relevant : await prompt_guild(bot);
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
	return relevant ? relevant : await prompt_channel(bot, djs_state);
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
		console.log(index.toString().padStart(3, " ").bold.green, guild.name.padEnd(50, " "), `${(guild.memberCount + " members")}`.dim.white);
	});
}