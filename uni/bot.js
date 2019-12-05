const Discord = require("discord.js");
const bot = new Discord.Client();
let djs;
const get_message_log = require("./get_message_log.js")
const state = require("./djs_state/state");

bot.login(process.env.TOKEN);

bot.on("ready", async () => {
	djs = require("./djs_state");
	console.log(`${">".bold.yellow} Bot is ready`);
	djs.state.guild = await djs.prompt_guild();
	djs.state.channel = await djs.prompt_channel();

	djs.state.channel.fetchMessages({ limit: 20 }).then(msgs => {
		msgs.sort((a, b) => a.createdAt - b.createdAt).forEach(msg => { console.log(get_message_log(msg)) });
	});

});

bot.on("message", message => {
	if(state && state.guild && state.channel && message.guild.id == state.guild.id && message.channel.id == state.channel.id) {
		console.log(get_message_log(message));
	}
});

module.exports = bot;