
const bot = require("../bot");
const ask = require("../ask");

module.exports = async () => {
	let answer = await ask();
	console.log(answer, "Lol")
}