
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
module.exports = get_name;