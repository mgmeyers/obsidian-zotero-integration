export function bringAppToFront() {
	require("electron").remote.getCurrentWindow().show();
}