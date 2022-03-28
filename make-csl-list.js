const fs = require("fs");
const convert = require("xml-js");

function readFiles(dirname, onFileContent, onError, done) {
	fs.readdir(dirname, function (err, filenames) {
		if (err) {
			onError(err);
			return;
		}

		for (let filename of filenames) {
			if (!filename.endsWith(".csl")) continue;
			const content = fs.readFileSync(dirname + filename);
			onFileContent(filename, convert.xml2js(content.toString()));
		}

		done();
	});
}

const cslList = [];

readFiles(
	"../styles/",
	function (filename, content) {
		if (content && content.elements) {
			const style = content.elements.find((el) => el.name === "style");

			if (style) {
				const info = style.elements.find((el) => el.name === "info");

				if (info) {
					const styleLink = info.elements.find(
						(el) =>
							el.name === "link" && el.attributes.rel === "self"
					);
					const titleEl = info.elements.find(
						(el) => el.name === "title"
					);
					const title = titleEl.elements[0].text;
					const id = styleLink.attributes.href.split("/").pop();

					cslList.push({ value: id, label: title });
				}
			}
		}
	},
	function (err) {
		throw err;
	},
	function () {
		fs.writeFileSync(
			"./src/csl-list.json",
			JSON.stringify(cslList, null, 2)
		);
	}
);
