
const state = require("./djs_state/state");
const possible_colors =  ["green", "magenta", "white", "brightRed", "brightGreen", "brightYellow", "brightBlue", "brightMagenta", "brightCyan"];
let color_index = 0;

function get_name(input) {
	let author = input.author || input;
	let color = state.user_colors[author.id]; //|| "gray";
	if(!color) {
		state.user_colors[author.id] = possible_colors[color_index % possible_colors.length];
		color_index++
	}
	color = state.user_colors[author.id];
	let suffix = "";

	let nick = author.nickname || (input.member ? input.member.displayName : undefined);
	if(nick !== author.username) {
		suffix = ` (${nick})`
	}
	if(author.bot) {
		suffix += ` ${"[BOT]".brightWhite.bgCyan}`;
		// " [BOT]" where only bot is colored
	}
	
	return `${author.username}${suffix}`.padEnd(15, " ")[[color]];

}

function get_time(message) {
	let d = new Date(message.createdAt);

	let hours = d.getHours().toString().padStart(2, 0);
	let minutes = d.getMinutes().toString().padStart(2, 0);
	let seconds = d.getSeconds().toString().padStart(2, 0);
	return `${hours}:${minutes}:${seconds}`;
	// return d.toJSON().split(/T|\./)[1];
}

function get_channel(message) {
	return `#${message.channel.name}`.bold.yellow;
}

function get_content(message) {
	// Color channels, check pings, etc
	let content = message.content.split(" ").map(word => {

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
			if((channel || {}).name) {
				word = `#${channel.name}`.bgGray;
			} else {
				word = `#unknown-channel`.bgRed;
			}
		}
		return word;

		return word;
	}).join(" ");

	if(message.attachments.size > 0) {
		let urls = message.attachments.array().map(a => a.url);
		content += " Attachments: ".bold.yellow + urls.join(", ").brightWhite;
	}

	return content.trim();
}

module.exports = {
	get_name,
	get_time,
	get_channel,
	get_content
}