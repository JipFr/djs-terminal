module.exports = str => {
	const { lang } = require("./config");
	if(lang == "owo") {
		const change = {
			"r": "w",
			"R": "W",
			"l": "w",
			"L": "W",
			"!": " ;;w;; "
		}
		return str.split("").map(char => change[char] ? change[char] : char).join("").trim();
	}
	return str;
}
