const Discord = require("discord.js");
const bot = new Discord.Client();
let djs;
const ask = require("./ask");
const commands = require("../commands");
const get_message_log = require("./get_message_log.js");
const state = require("./djs_state/state");
const { get_name, get_channel } = require("./message_gets");

bot.login(process.env.TOKEN);

bot.on("ready", async () => {
	djs = require("./djs_state");
	console.log(`${">".bold.yellow} Bot is ready`);
	djs.state.guild = await djs.prompt_guild();
	djs.state.channel = await djs.prompt_channel();

	djs.state.channel.fetchMessages({ limit: 20 }).then(msgs => {
		msgs.sort((a, b) => a.createdAt - b.createdAt).forEach(msg => { console.log(get_message_log(msg)) });
		console.log("—".repeat(30).bold.green);
		prompt_message();
	});

});

bot.on("message", message => {
	if(state && state.guild && state.channel && message.guild.id == state.guild.id && message.channel.id == state.channel.id) {
		console.log(get_message_log(message));
	} else {
		// Not currently selected channel
		message.mentions.members.array().forEach(member => {
			if(member.id == bot.user.id) {
				console.log(`${"—".repeat(3)} You were mentioned in ${message.guild.name.bold.yellow}'s ${get_channel(message)} by ${get_name(message)} ${"—".repeat(3)}`)
			}
		});
	}
});

module.exports = bot;

async function prompt_message() {
	let input = await ask("");
	if(input == commands.switch_server) {

	} else if(input == commands.switch_channel) {

	} else if(input == commands.delete_message) {

	} else {
		send_message(input).then(prompt_message);
	}
}

function send_message(text) {
	return new Promise(resolve => {
		state.channel.send(text).then(resolve);
	});
}