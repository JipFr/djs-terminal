
const state = require("./djs_state/state");

function get_name(input) {
	let author = input.author || input;
	let color = state.user_colors[author.id] || "gray";
	let suffix = "";

	// let nick = (message.member || {}).displayName;
	let nick = author.nickname || (input.member ? input.member.displayName : undefined);
	if(nick !== author.username) {
		suffix = ` (${nick})`
	}

	console.log(Object.keys(input.user));
	
	return `${author.username}${suffix}`[[color]];

}

function get_time(message) {
	let d = new Date(message.createdAt);
	return d.toJSON().split(/T|\./)[1];
}

function get_channel(message) {
	return `#${message.channel.name}`.bold.yellow;
}

function get_content(message) {
	// Color channels, check pings, etc
	let content = message.content.split(" ").map(word => {

		let ping_match = word.match(/<@!?(\d+)>/);
		if(ping_match) {
			let id = ping_match[1];
			let pinged_user = message.guild.members.array().find(u => u.id == id);
			console.log(get_name(pinged_user));
		}

		return word;
	}).join(" ");
	return message.content;
}

module.exports = {
	get_name,
	get_time,
	get_channel,
	get_content
}