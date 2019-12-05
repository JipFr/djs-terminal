
const state = require("./djs_state/state");
const { get_name, get_time, get_channel } = require("./message_gets");
state.user_colors = {
	"159704489970892800": "brightWhite"	
}

const get_message_log = message => {
	let content = get_content(message);
	let name = get_name(message);
	let channel = get_channel(message);
	let time = get_time(message);

	let final = `${channel} | ${time} | ${name.padEnd(15, " ")}: ${content}`;
	return final;
}

function get_content(message) {
	return message.content;
}

module.exports = get_message_log; 