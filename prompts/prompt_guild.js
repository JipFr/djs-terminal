
const { get_guilds } = require("../gets.js");
const { ask } = require("../ask");

module.exports = async bot => {
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

function log_guilds(bot) {
	mapped_guilds = {}
	let guilds = get_guilds(bot);
	guilds.forEach((guild, index) => {
		mapped_guilds[index] = guild;
		console.log(index.toString().bold.green, guild.name);
	});
}