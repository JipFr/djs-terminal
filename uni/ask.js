
const serverline = require("serverline");
serverline.init();

module.exports = (question = "") => {
	return new Promise(resolve => {
		serverline.question(question, a => {
			resolve(a);
		});
	});
}