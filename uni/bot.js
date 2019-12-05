const Discord = require("discord.js");
const bot = new Discord.Client();
let djs;

bot.login(process.env.TOKEN);

bot.on("ready", async () => {
	djs = require("./djs_state");
	console.log(`${">".bold.yellow} Bot is ready`);
	djs.state.guild = await djs.prompt_guild();
});

module.exports = bot;