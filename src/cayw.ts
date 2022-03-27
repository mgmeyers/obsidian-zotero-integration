import { Notice, request, moment } from "obsidian";
import { bringAppToFront, padNumber } from "./helpers";
import { LoadingModal } from "./LoadingModal";
import { CitationFormat, Database } from "./types";

const defaultHeaders = {
	"Content-Type": "application/json",
	"User-Agent": "obsidian/zotero",
	Accept: "application/json",
	Connection: "keep-alive",
};

export function getPort(database: Database) {
	return database === "Zotero" ? "23119" : "24119";
}

export async function isZoteroRunning(database: Database) {
	const modal = new LoadingModal(
		(window as any).app,
		"Fetching data from Zotero..."
	);
	modal.open();
	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(
				database
			)}/better-bibtex/cayw?probe=true`,
			headers: defaultHeaders,
		});

		modal.close();
		return res === "ready";
	} catch (e) {
		modal.close();
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
			return `format=pandoc${format.brackets ? "&brackets=true" : ""}`;
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

	const modal = new LoadingModal(
		(window as any).app,
		"Awaiting item selection from Zotero..."
	);
	modal.open();
	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(
				database
			)}/better-bibtex/cayw?${getQueryParams(format)}`,
			headers: defaultHeaders,
		});

		bringAppToFront();
		modal.close();
		return res;
	} catch (e) {
		bringAppToFront();
		console.error(e);
		modal.close();
		new Notice(`Error processing citation: ${e.message}`, 10000);
		return null;
	}
}

export async function getCAYWJSON(database: Database) {
	if (!(await isZoteroRunning(database))) {
		return null;
	}

	const modal = new LoadingModal(
		(window as any).app,
		"Awaiting item selection from Zotero..."
	);
	modal.open();

	try {
		const res = await request({
			method: "GET",
			url: `http://127.0.0.1:${getPort(
				database
			)}/better-bibtex/cayw?format=json`,
			headers: defaultHeaders,
		});

		bringAppToFront();

		modal.close();
		if (res) {
			return JSON.parse(res);
		} else {
			return null;
		}
	} catch (e) {
		bringAppToFront();
		console.error(e);
		modal.close();
		new Notice(`Error retrieving cite key: ${e.message}`, 10000);
		return null;
	}
}

export async function getNotesFromCiteKeys(
	citeKeys: string[],
	database: Database
) {
	let res: string;

	const modal = new LoadingModal(
		(window as any).app,
		"Fetching notes from Zotero..."
	);
	modal.open();

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
		modal.close();
		new Notice(`Error retrieving notes: ${e.message}`, 10000);
		return null;
	}

	try {
		modal.close();
		return JSON.parse(res).result;
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(`Error retrieving notes: ${e.message}`, 10000);
		return null;
	}
}

export async function getBibFromCiteKey(citeKey: string, database: Database) {
	let res: string;
	const modal = new LoadingModal(
		(window as any).app,
		"Fetching data from Zotero..."
	);
	modal.open();
	try {
		res = await request({
			method: "POST",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "item.bibliography",
				params: [[citeKey], { quickCopy: true, contentType: "html" }],
			}),
			headers: defaultHeaders,
		});
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(
			`Error retrieving formatted bibliography: ${e.message}`,
			10000
		);
		return null;
	}

	try {
		modal.close();
		return JSON.parse(res).result;
	} catch (e) {
		modal.close();
		console.error(e);
		new Notice(
			`Error retrieving formatted bibliography: ${e.message}`,
			10000
		);
		return null;
	}
}

export async function getItemJSONFromCiteKeys(
	citeKeys: string[],
	database: Database
) {
	let res: string;

	const modal = new LoadingModal(
		(window as any).app,
		"Fetching data from Zotero..."
	);
	modal.open();

	try {
		res = await request({
			method: "POST",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "item.export",
				params: [citeKeys, "36a3b0b5-bad0-4a04-b79b-441c7cef77db"],
			}),
			headers: defaultHeaders,
		});
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(`Error retrieving item data: ${e.message}`, 10000);
		return null;
	}

	try {
		modal.close();
		return JSON.parse(JSON.parse(res).result[2]).items;
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(`Error retrieving item data: ${e.message}`, 10000);
		return null;
	}
}

export async function getIssueDateFromCiteKey(
	citeKey: string,
	database: Database
) {
	let res: string;

	const modal = new LoadingModal(
		(window as any).app,
		"Fetching data from Zotero..."
	);
	modal.open();

	try {
		res = await request({
			method: "POST",
			url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "item.export",
				params: [[citeKey], "f4b52ab0-f878-4556-85a0-c7aeedd09dfc"],
			}),
			headers: defaultHeaders,
		});
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(`Error retrieving item data: ${e.message}`, 10000);
		return null;
	}

	try {
		modal.close();

		const items = JSON.parse(JSON.parse(res).result[2]);
		const dates = items
			.map((i: any) => {
				const { issued } = i;
				if (!issued) return null;

				const dateParts = issued["date-parts"][0];

				if (!dateParts.length) return null;

				const date = moment(
					`${dateParts[0]}-${
						dateParts[1] ? padNumber(dateParts[1]) : "01"
					}-${dateParts[2] ? padNumber(dateParts[2]) : "01"}`,
					"YYYY-MM-DD"
				);

				return date;
			})
			.filter((d: any) => d);

		return dates[0] ? dates[0] : null;
	} catch (e) {
		console.error(e);
		modal.close();
		new Notice(`Error retrieving item data: ${e.message}`, 10000);
		return null;
	}
}
