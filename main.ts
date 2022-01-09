import { App, Plugin, request } from "obsidian";
import { exec } from "child_process";

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

// function preformRequest(opts: Record<string, any>): Promise<string> {
// 	return new Promise((res, rej) => {
// 		const electron = require("electron");
// 		const net = electron.remote.net;
// 		let data = "";

// 		const request = net.request({
// 			method: opts.method,
// 			url: opts.url,
// 		});

// 		request.on("response", (response: any) => {
// 			console.log(`STATUS: ${response.statusCode} ${response.statusMessage}`);

// 			response.on("error", (error: any) => {
// 				rej(error);
// 			});

// 			response.on("end", () => {
// 				console.log("end", data);
// 				res(data);
// 			});

// 			response.on("data", (buf: Buffer) => {
// 				console.log("data", buf.toString());
// 				data += buf.toString();
// 			});
// 		});

// 		request.on("abort", () => {
// 			rej(new Error("Request aborted"));
// 		});

// 		request.on("close", () => {
// 			console.log("close", data);
// 		});

// 		if (opts.body) {
// 			console.log("writing body", opts.url, opts.body);
// 			request.write(opts.body, "utf-8");
// 		}

// 		request.end();
// 	});
// }

async function getCAYTResults() {
	try {
		const res = await request({
			method: "GET",
			url: "http://127.0.0.1:23119/better-bibtex/cayw?format=json&minimize=true",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"User-Agent": "obsidian/zot",
				Connection: "keep-alive",
			},
		});
		return JSON.parse(res);
	} catch (e) {
		console.error(e);
		throw new Error("Error executing CAYT");
	}
}

async function getPDFPathFromCiteKey(citeKey: string) {
	let res: string;
	try {
		const body = JSON.stringify({
			jsonrpc: "2.0",
			method: "item.attachments",
			params: [citeKey],
		});
		res = await request({
			method: "POST",
			url: "http://127.0.0.1:23119/better-bibtex/json-rpc",
			body,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"User-Agent": "obsidian/zot",
				Connection: "keep-alive",
			},
		});
	} catch (e) {
		console.error(e);
		throw new Error("Error retrieving attachments for " + citeKey);
	}

	try {
		const json = JSON.parse(res);

		if (json.result && json.result.length) {
			return (
				(json.result as any[]).find((r) => {
					return r.path.endsWith(".pdf");
				})?.path || null
			);
		}
	} catch (e) {
		console.error(e);
		throw new Error("Error parsing attachments for " + citeKey);
	}

	return null;
}

function extractAnnotations(app: App, citeKey: string, pdfPath: string) {
	const outputPath = `${(app.vault.adapter as any).basePath}/Notes/Zotero`;
	const assetsPath = `${
		(app.vault.adapter as any).basePath
	}/Notes/Zotero/Assets`;

	return new Promise<string>((res, rej) => {
		exec(
			`echo $NVM_DIR && source $NVM_DIR/nvm.sh && node /Users/matt/Documents/Personal/pdf-tests/index.js "${citeKey}" "${pdfPath}" "${outputPath}" "${assetsPath}"`,
			{
				cwd: "/Users/matt/Documents/Personal/pdf-tests/",
				shell: "/bin/zsh",
			},
			(err, stout, sterr) => {
				if (err) {
					return rej(err);
				}

				if (sterr) return rej(sterr);

				res(stout);
			}
		);
	});
}

async function getAnnotations(app: App) {
	try {
		const res = await getCAYTResults();

		if (!res || !res.length) return;

		const citeKey = res[0].citekey;
		const pdfPath = await getPDFPathFromCiteKey(citeKey);

		if (!pdfPath) {
			throw new Error("PDF not found");
		}

		await extractAnnotations(app, citeKey, pdfPath);
	} catch (e) {
		console.error(e);
	}
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "extract-annotations",
			name: "Extract Annotations",
			callback: () => {
				getAnnotations(this.app).catch((e) => console.error(e));
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
