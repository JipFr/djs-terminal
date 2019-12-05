
const state = require("./djs_state/state");

function get_name(message) {
	let color = state.user_colors[message.author.id] || "gray";
	let suffix = "";

	let nick = (message.member || {}).displayName;
	if(nick !== message.author.username) {
		suffix = ` (${nick})`
	}

	return `${message.author.username}${suffix}`[[color]];

}

function get_time(message) {
	let d = new Date(message.createdAt);
	return d.toJSON().split(/T|\./)[1];
}

function get_channel(message) {
	return `#${message.channel.name}`.bold.yellow;
}

module.exports = {
	get_name,
	get_time,
	get_channel
}