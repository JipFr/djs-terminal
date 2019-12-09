<<<<<<< HEAD
console.clear();
=======

const djs = require("discord.js");
const bot = new djs.Client();

const { possible_colors, override_user_colors } = require("./config");
const { prompt_guild, prompt_channel } = require("./prompts");
const { get_channels, get_guilds, get_content, get_message_text, get_user_color } = require("./gets");
const { ask } = require("./ask");
const { log_channel, log_guild } = require("./logs");
const translate = require("./translate");
const pings = {}

require("colors");
>>>>>>> master
require("dotenv").config();
require("colors");

<<<<<<< HEAD
console.log("Starting".bold.green);
=======
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

	djs_state.guild = await prompt_guild(bot, pings);
	log_guild(djs_state);
	djs_state.channel = await prompt_channel(bot, djs_state, pings);

	log_channel(bot, djs_state);
	prompt();
});

bot.on("message", message => {

	let is_in_msg = message.mentions.users.array().find(u => u.id == bot.user.id);
	if(is_in_msg) {
		if(!pings[message.guild.id]) {
			pings[message.guild.id] = {}
		}
		if(!pings[message.guild.id][message.channel.id]) {
			pings[message.guild.id][message.channel.id] = true;
		}
		if(message.channel.id !== djs_state.channel.id) {
			console.log(`${"—".repeat(5).bold.green} You were pinged in ${message.guild.name.dim.yellow}'s #${message.channel.name.dim.yellow} by ${message.author.username.dim[get_user_color(message.author, bot)]} ${"—".repeat(5).bold.green}`);
		}
	}

	if(djs_state && !djs_state.channel) return;
	if(message.channel.id == djs_state.channel.id) {
		console.log(get_message_text(message, bot, djs_state));
	}
});

async function handle_input(msg) {
	if(msg == commands.switch_server) {
		// Switch server code...

		djs_state.guild = await prompt_guild(bot, pings);
		log_guild(djs_state);
		djs_state.channel = await prompt_channel(bot, djs_state, pings);

		log_channel(bot, djs_state);
		prompt();
	} else if(msg == commands.switch_channel) {
		// Switch channel code...

		djs_state.channel = await prompt_channel(bot, djs_state, pings);

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
		djs_state.channel.send(translate(msg)).then(prompt);
	}
}
>>>>>>> master

const { bot, djs_state } = require("./uni");