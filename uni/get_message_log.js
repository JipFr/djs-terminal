
const state = require("./djs_state/state");
state.user_colors = {
	"159704489970892800": "brightWhite"	
}

const get_message_log = message => {
	let content = get_content(message);
	let name = get_name(message);
	let channel = get_channel(message);
	let time = get_time(message);

	let final = `${channel} | ${time} | ${name}: ${content}`;
	return final;
}

function get_time(message) {
	let d = new Date(message.createdAt);
	return d.toJSON().split(/T|\./)[1];
}

function get_channel(message) {
	return `#${message.channel.name}`.bold.yellow;
}

function get_name(message) {
	let color = state.user_colors[message.author.id] || "gray";
	let suffix = "";

	let nick = (message.member || {}).displayName;
	if(nick !== message.author.username) {
		suffix = ` (${nick})`
	}

	return `${message.author.username}${suffix}`.padEnd(15, " ")[[color]];

}

function get_content(message) {
	return message.content;
}

module.exports = get_message_log; 