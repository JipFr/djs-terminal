const Discord = require("discord.js");
const bot = new Discord.Client();
let djs;
const ask = require("./ask");
const commands = require("../commands");
const get_message_log = require("./get_message_log.js");
const state = require("./djs_state/state");
const log_channel = require("./djs_state/log_channel");
const get_channels = require("./djs_state/get_channels");
const { get_name, get_channel, get_content } = require("./message_gets");
state.bot_ready = false;

bot.login(process.env.TOKEN);

setInterval(() => {
	if(!state.bot_ready) console.log("Something is taking too long...".bold.red);
}, 10e3);

bot.on("ready", async () => {
	state.bot_ready = true;
	djs = require("./djs_state");
	console.log(`${">".bold.yellow} Bot is ready`);
	state.pings = {}
	djs.state.guild = await djs.prompt_guild();
	djs.state.channel = await djs.prompt_channel();
	log_channel().then(prompt_message);
});

bot.on("message", message => {
	if(state && state.show_messages && state.guild && state.channel && message.guild && message.guild.id == state.guild.id && message.channel.id == state.channel.id) {
		console.log(get_message_log(message));
	}

	if(message.author.id === bot.user.id && message.content.toLowerCase(// TODO) === "this") {
		// TODO
	}

	if(!message.mentions.members) return;
	message.mentions.members.array().forEach(member => {
		if(member.id == bot.user.id) {
			if(message.channel.id !== (state.channel || {}).id) {
				console.log(`${"—".repeat(3)} You were mentioned in ${message.guild.name.bold.yellow}'s ${get_channel(message)} by ${get_name(message)} ${"—".repeat(3)}`)
			}
			// Update ping object
			if(!state.pings[message.guild.id]) {
				state.pings[message.guild.id] = {}
			}
			if(!state.pings[message.guild.id][message.channel.id]) {
				state.pings[message.guild.id][message.channel.id] = true;
			}
		}
	});	
});

module.exports = bot;

async function prompt_message() {
	let input = await ask("");
	switch(input) {
		case commands.switch_server:
			
			state.guild = await djs.prompt_guild();
			state.channel = await djs.prompt_channel();
			log_channel().then(prompt_message);
			
			break;
		case commands.switch_channel:
			
			state.channel = await djs.prompt_channel();
			log_channel().then(prompt_message);
			
			break;
		case commands.delete_message:

			state.channel.fetchMessages({ limit: 5 }).then(messages => {
				let msg = messages.array().find(msg => msg.author.id == bot.user.id);
				if(msg) {
					msg.delete(1);
					console.log(`${"Deleted message:".bold.yellow} ${get_content(msg)}`);
				} else {
					console.log("Message not found".bold.yellow)
				}
				prompt_message();
			});

			break;
		default:
			send_message(input).then(prompt_message);
			break;
	}
}

function send_message(text) {
	if(!text || text.length == 0) return;

	let message = text.split(" ").map(word => {
		let allowed_characters = "abcdefghijklmnopqrstuvwxyz-";
		let hashtag_match = word.match(/#(.\S+)/);
		if(hashtag_match) {
			let channel_name = hashtag_match[1].split("").filter(letter => allowed_characters.includes(letter.toLowerCase())).join("");
			let channel = get_channels().all.find(ch => ch.name.trim().toLowerCase() == channel_name.trim().toLowerCase());
			if(channel) {
				word = word.replace(`#${channel_name}`, `<#${channel.id}>`);
			}
		}
		return word;
	}).join(" ");

	return new Promise(resolve => {
		state.channel.send(message).then(resolve);
	});
}