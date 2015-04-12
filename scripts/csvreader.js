var fs = require('fs');

/* Return array of all objects in csv array */
module.exports = function(file) {
	var readFile = fs.readFileSync(file);
	readFile = String(readFile);
	readFile = readFile.trim()
	var lines = readFile.split("\n");

	/* Create keys */
	var keys = lines[0].split(",").map(function(element) {
		return element.toLowerCase();
	});

	var results = [];

	for (var i = 1; i < lines.length; i++) {
		var values = lines[i].split(",");
		var result = {};

		for (var j = 0; j < keys.length; j++) {
			if (isNaN(values[j])) {
				result[String(keys[j])] = String(values[j]);
			} else {
				result[String(keys[j])] = Number(values[j]);
			}
		}

		results.push(result);
	}

	return results;
}
