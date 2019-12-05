
const state = require("./state");
const get_message_log = require("../get_message_log");

module.exports = () => {
	return new Promise(resolve => {
		console.clear();
		console.log(`\nSelected channel: ${`#${state.channel.name.bold.yellow}`.bold.yellow} in ${state.guild.name.bold.yellow}\n`);
		state.channel.fetchMessages({ limit: 20 }).then(msgs => {
			msgs.sort((a, b) => a.createdAt - b.createdAt).forEach(msg => { console.log(get_message_log(msg)) });
			console.log("—".repeat(30).bold.green);
		});
		resolve(true);
	});
}