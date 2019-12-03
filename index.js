
const djs = require("discord.js");
const bot = new djs.Client();
const { possible_colors, override_user_colors } = require("./config");

const { prompt_guild, prompt_channel } = require("./prompts");
const { get_channels, get_guilds, get_content, get_message_text } = require("./gets");
const { ask } = require("./ask");
const { log_channel, log_guild } = require("./logs");

require("colors");
require("dotenv").config();

bot.login(process.env.TOKEN);

function prompt() {
	ask("").then(handle_input);
}

const commands = require("./commands");

let djs_state;
let mapped_channels = {}
let mapped_guilds = {}
bot.on("ready", async () => {
	console.log("Started");
	djs_state = {}

	djs_state.guild = await prompt_guild(bot);
	log_guild(djs_state);
	djs_state.channel = await prompt_channel(bot, djs_state);

	log_channel(bot, djs_state);
	prompt();
});

bot.on("message", message => {
	if(djs_state && !djs_state.channel) return;
	if(message.channel.id == djs_state.channel.id) {
		console.log(get_message_text(message, bot, djs_state));
	}
});

async function handle_input(msg) {
	if(msg == commands.switch_server) {
		// Switch server code...

		djs_state.guild = await prompt_guild(bot);
		log_guild(djs_state);
		djs_state.channel = await prompt_channel(bot, djs_state);

		log_channel(bot, djs_state);
		prompt();
	} else if(msg == commands.switch_channel) {
		// Switch channel code...

		djs_state.channel = await prompt_channel(bot, djs_state);

		log_channel(bot, djs_state);
		prompt();
	} else if(msg == commands.delete_message) {
		// Delete latest message
		djs_state.channel.fetchMessages({limit: 5}).then(messages => {
			messages = messages.array();
			let message = messages.find(msg => msg.author.id == bot.user.id);
			if(message) message.delete(0);
			console.log("Deleted message:".bold.yellow, message.content);
			prompt();
		});

	} else {
		// Send message
		djs_state.channel.send(msg).then(prompt);
	}
}

