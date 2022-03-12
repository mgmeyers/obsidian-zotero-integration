import { Notice, request } from "obsidian";
import { bringAppToFront } from "./helpers";
import { CitationFormat, Database } from "./types";

const defaultHeaders = {
	"Content-Type": "application/json",
	"User-Agent": "obsidian/zotero",
	Accept: "application/json",
	Connection: "keep-alive",
};

export function getPort(database: Database) {
	return database === 'Zotero' ? '23119' : '24119';
}


export async function isZoteroRunning(database: Database) {
	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/cayw?probe=true`,
			headers: defaultHeaders,
		});

		return res === "ready";
	} catch (e) {
		new Notice(
			"Cannot connect to Zotero. Please ensure it is running and the Better BibTeX plugin is installed",
			10000
		);
		return false;
	}
}

function getQueryParams(format: CitationFormat) {
	switch (format.format) {
		case "formatted-bibliography":
			return "format=formatted-bibliography";
		case "formatted-citation":
			return "format=formatted-citation";
		case "pandoc":
			return `format=pandoc&brackets=${!!format.brackets}`;
		case "latex":
			return `format=latex&command=${format.command || "cite"}`;
		case "biblatex":
			return `format=biblatex&command=${format.command || "autocite"}`;
	}
}

export async function getCAYW(format: CitationFormat, database: Database) {
	if (!(await isZoteroRunning(database))) {
		return null;
	}

	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/cayw?${getQueryParams(
				format
			)}`,
			headers: defaultHeaders,
		});

		bringAppToFront();

		return res;
	} catch (e) {
		bringAppToFront();
		console.error(e);
		new Notice(`Error processing citation: ${e.message}`, 10000);
        return null;
	}
}

export async function getCAYWJSON(database: Database) {
	if (!(await isZoteroRunning(database))) {
		return null;
	}

	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/cayw?format=json`,
			headers: defaultHeaders,
		});

		bringAppToFront();

		return JSON.parse(res);
	} catch (e) {
		bringAppToFront();
		console.error(e);
		new Notice(`Error retrieving cite key: ${e.message}`, 10000);
        return null;
	}
}

export async function getNotesFromCiteKeys(citeKeys: string[], database: Database) {
	let res: string;

	try {
		res = await request({
			method: "POST",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "item.notes",
				params: [citeKeys],
			}),
			headers: defaultHeaders,
		});
	} catch (e) {
		console.error(e);
		new Notice(`Error retrieving notes: ${e.message}`, 10000);
        return null;
	}

	try {
		return JSON.parse(res).result;
	} catch (e) {
		console.error(e);
		new Notice(`Error retrieving notes: ${e.message}`, 10000);
        return null;
	}
}
