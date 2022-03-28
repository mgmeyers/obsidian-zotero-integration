import React from "react";
import { StylesConfig } from "react-select";
import { cslList } from "./cslList";

export const customSelectStyles: StylesConfig = {
	control: (provided, state) => {
		return {
			...provided,
			borderColor: state.isFocused
				? "var(--interactive-accent)"
				: "var(--background-modifier-border)",
			boxShadow: state.isFocused
				? "0 0 0 1px var(--interactive-accent)"
				: "none",
			":hover": {
				borderColor: state.isFocused
					? "var(--interactive-accent)"
					: "var(--background-modifier-border)",
			},
		};
	},
};

export function searchCSL(inputValue: string) {
	return cslList.search(inputValue).map((res) => res.item);
}

let loadCSLOptionsDB = 0;

export function loadCSLOptions(
	inputValue: string,
	callback: (options: Array<{ value: string; label: string }>) => void
) {
	if (inputValue === "") {
		callback([]);
	} else {
		clearTimeout(loadCSLOptionsDB);
		loadCSLOptionsDB = window.setTimeout(() => {
			callback(searchCSL(inputValue));
		}, 150);
	}
}

export function NoOptionMessage() {
	return <span>Type to search CSL styles</span>;
}