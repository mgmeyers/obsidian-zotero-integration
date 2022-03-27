import { App, FileSystemAdapter } from "obsidian";

export function bringAppToFront() {
	require("electron").remote.getCurrentWindow().show();
}

export function padNumber(n: number): string {
	return n < 10 ? `0${n}` : n.toString();
}

export function getVaultRoot() {
	return (
		((window as any).app as App).vault.adapter as FileSystemAdapter
	).getBasePath();
}
