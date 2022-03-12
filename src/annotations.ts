import { App, request } from "obsidian";
import { exec } from "child_process";
import { bringAppToFront } from "./helpers";

async function getCAYWResults() {
	try {
		const res = await request({
			method: "GET",
			url: "http://127.0.0.1:23119/better-bibtex/cayw?format=json",
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
		throw new Error("Error executing CAYW");
	}
}

export async function getPDFPathFromCiteKey(citeKey: string) {
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

export function extractAnnotations(app: App, citeKey: string, pdfPath: string) {
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

export async function getAnnotations(app: App) {
	try {
		const res = await getCAYWResults();

		bringAppToFront();

		if (!res || !res.length) return;

		const citeKey = res[0].citekey;
		const pdfPath = await getPDFPathFromCiteKey(citeKey);

		if (!pdfPath) {
			throw new Error("PDF not found");
		}

		console.log(await extractAnnotations(app, citeKey, pdfPath));
	} catch (e) {
		console.error(e);
	}
}