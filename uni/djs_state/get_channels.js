const bot = require("../bot");
const state = require("./state");

module.exports = () => {
	let all_channels = state.guild.channels.array().sort((a, b) => a.position - b.position);

	let mapped_cats = all_channels.filter(ch => ch.type == "category").map(cat => {
			return {
				name: cat.name,
				id: cat.id,
				channels: []
			}
		});

	all_channels.filter(ch => ch.type == "text").forEach(channel => {
		let cat_id = channel.parentID;
		let cat = mapped_cats.find(cat => cat.id == cat_id);
		if(cat) {
			cat.channels.push(channel);
		}
	});

	return {
		all: all_channels,
		cats: mapped_cats
	}

}