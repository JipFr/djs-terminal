
const { override_user_colors, possible_colors, lang } = require("./config.json");
const translate = require("./translate");
let mapped_user_colors = {}
let color_index = 0;

const get_guilds = bot => bot.guilds.array().sort((a, b) => a.position - b.position);
const get_channels = (bot, djs_state) => djs_state.guild.channels.array()/*.filter(channel => channel.type == "text")*/.sort((a, b) => a.position - b.position);

function get_message_text(message, bot, djs_state) {
	let u_color = mapped_user_colors[message.author.id];

	if(!u_color) {
		if(override_user_colors[message.author.id]) {
			mapped_user_colors[message.author.id] = override_user_colors[message.author.id];
		} else if(message.author.id == bot.user.id) {
			mapped_user_colors[message.author.id] = "white";
		} else {
			// mapped_user_colors[message.author.id] = possible_colors[Math.floor(Math.random() * possible_colors.length)];
			// mapped_user_colors[message.author.id] = "gray";
			mapped_user_colors[message.author.id] = possible_colors[color_index % possible_colors.length];
			color_index++
		}
		
		u_color = mapped_user_colors[message.author.id];
	}

	let highlight = message.mentions.users.array().find(u => u.id == bot.user.id) ? true : false;
	let text = (highlight ? get_content(message).bold.underline : get_content(message));
	let name = message.author.username[u_color];
	let nick = (message.member || {}).displayName;
	if(nick && message.author.username !== nick) {
		name += ` (${nick})`;
	}
	
	let date = new Date(message.createdAt);
	let time = `${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`
	let divider = "|".dim.white;

	let result = `${`#${djs_state.channel.name}`.bold.yellow} ${divider} ${time.dim.white} ${divider} ${`${name}:`.padEnd(20, " ")} ${text}`;
	return result;
}
function get_content(message) {
	let content = message.content;

	content = content.split(" ").map(word => {
	
		let match_mention = word.match(/<@!?(\d+)>/);
		if(match_mention) {
			let u_id = match_mention[1];
			let user = message.mentions.users.array().find(u => u.id == u_id);
			word = `@${(user || {}).username}`.brightWhite;
		}

		let match_channel = word.match(/<#(\d+)>/);
		if(match_channel) {
			let c_id = match_channel[1];
			let channel = message.guild.channels.array().find(ch => ch.id == c_id);
			word = `#${(channel || {}).name || "deleted-channel"}`.bgRed;
		}
		return word;
	
	}).join(" ");

	if(message.attachments.size > 0) {
		let urls = message.attachments.array().map(a => a.url);
		content += " Attachments: ".bold.yellow + urls.join(", ").brightWhite;
	}

	content = content.split("\n").map(line => {
		if(line.startsWith("> ")) line = line.bgGray;
		return line.trim();
	}).join("\n");

	return translate(content);
}

module.exports = {
	get_guilds,
	get_channels,
	get_content,
	get_message_text
}