
const serverline = require("serverline");
serverline.init();

module.exports = {
	ask: args => new Promise(resolve => {
		serverline.getRL().question(args, resolve);
	})
}