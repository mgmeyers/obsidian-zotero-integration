import Handlebars from "handlebars";
import helpers from "handlebars-helpers";
import { moment } from "obsidian";

helpers({
	handlebars: Handlebars,
});

function dateFormat(date: moment.Moment, format: string, utc: boolean) {
	return utc === true ? date.utc().format(format) : date.format(format);
}

Handlebars.registerHelper("format-date", dateFormat);
