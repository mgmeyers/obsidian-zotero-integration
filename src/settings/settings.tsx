import { App, debounce, PluginSettingTab } from "obsidian";
import React from "react";
import ReactDOM from "react-dom";
import ZoteroConnector from "../main";
import { CiteFormatSettings } from "./CiteFormatSettings";
import { ExportFormatSettings } from "./ExportFormatSettings";
import { SettingItem } from "./SettingItem";
import {
	CitationFormat,
	ExportFormat,
	GroupingOptions,
	SortingOptions,
	ZoteroConnectorSettings,
} from "../types";
import { AssetDownloader } from "./AssetDownloader";

interface SettingsComponentProps {
	settings: ZoteroConnectorSettings;
	addCiteFormat: (format: CitationFormat) => CitationFormat[];
	updateCiteFormat: (
		index: number,
		format: CitationFormat
	) => CitationFormat[];
	removeCiteFormat: (index: number) => CitationFormat[];
	addExportFormat: (format: ExportFormat) => ExportFormat[];
	updateExportFormat: (index: number, format: ExportFormat) => ExportFormat[];
	removeExportFormat: (index: number) => ExportFormat[];
	updateSetting: (key: keyof ZoteroConnectorSettings, value: any) => void;
}

function SettingsComponent({
	settings,
	addCiteFormat,
	updateCiteFormat,
	removeCiteFormat,
	addExportFormat,
	updateExportFormat,
	removeExportFormat,
	updateSetting,
}: SettingsComponentProps) {
	const [citeFormatState, setCiteFormatState] = React.useState(
		settings.citeFormats
	);
	const [exportFormatState, setExportFormatState] = React.useState(
		settings.exportFormats
	);

	const updateCite = React.useCallback(
		debounce(
			(index: number, format: CitationFormat) => {
				setCiteFormatState(updateCiteFormat(index, format));
			},
			200,
			true
		),
		[updateCiteFormat]
	);

	const addCite = React.useCallback(() => {
		setCiteFormatState(
			addCiteFormat({
				name: `Format #${citeFormatState.length + 1}`,
				format: "formatted-citation",
			})
		);
	}, [addCiteFormat, citeFormatState]);

	const removeCite = React.useCallback(
		(index: number) => {
			setCiteFormatState(removeCiteFormat(index));
		},
		[removeCiteFormat]
	);

	const updateExport = React.useCallback(
		debounce(
			(index: number, format: ExportFormat) => {
				setExportFormatState(updateExportFormat(index, format));
			},
			200,
			true
		),
		[updateExportFormat]
	);

	const addExport = React.useCallback(() => {
		setExportFormatState(
			addExportFormat({
				name: `Export #${exportFormatState.length + 1}`,
				outputPathTemplate: "{{citekey}}.md",
				imageOutputPathTemplate: "{{citekey}}/",
				imageBaseNameTemplate: "image",
			})
		);
	}, [addExportFormat, citeFormatState]);

	const removeExport = React.useCallback(
		(index: number) => {
			setExportFormatState(removeExportFormat(index));
		},
		[removeExportFormat]
	);

	return (
		<>
			<AssetDownloader exeVersion={settings.exeVersion} updateSetting={updateSetting} />
			<SettingItem
				name="Database"
				description="Supports Zotero and Juris-M"
			>
				<select
					className="dropdown"
					defaultValue={settings.database}
					onChange={(e) => updateSetting("database", e.target.value)}
				>
					<option value="Zotero">Zotero</option>
					<option value="Juris-M">Juris-M</option>
				</select>
			</SettingItem>
			<SettingItem
				name="Note Import Location"
				description="Notes imported from Zotero will be added to this folder in your vault"
			>
				<input
					onChange={(e) =>
						updateSetting("noteImportFolder", e.target.value)
					}
					type="text"
					spellCheck="false"
					placeholder="Example: folder 1/folder 2"
					defaultValue={settings.noteImportFolder}
				/>
			</SettingItem>
			<SettingItem
				name="PDF Annotations: Image Format"
			>
				<select
					className="dropdown"
					defaultValue={settings.pdfExportImageFormat}
					onChange={(e) => updateSetting("pdfExportImageFormat", e.target.value)}
				>
					<option value="jpg">jpg</option>
					<option value="png">png</option>
				</select>
			</SettingItem>
			<SettingItem
				name="PDF Annotations: Image Quality (jpg only)"
			>
				<input
					onChange={(e) =>
						updateSetting("pdfExportImageQuality", Number(e.target.value))
					}
					type="number"
					defaultValue={settings.pdfExportImageQuality}
				/>
			</SettingItem>
			<SettingItem
				name="PDF Annotations: Image DPI"
			>
				<input
					onChange={(e) =>
						updateSetting("pdfExportImageDPI", Number(e.target.value))
					}
					type="number"
					defaultValue={settings.pdfExportImageDPI}
				/>
			</SettingItem>
			<SettingItem name="Citation Formats">
				<button onClick={addCite} className="mod-cta">
					Add Citation Format
				</button>
			</SettingItem>
			{citeFormatState.map((f, i) => {
				return (
					<CiteFormatSettings
						key={i}
						format={f}
						index={i}
						updateFormat={updateCite}
						removeFormat={removeCite}
					/>
				);
			})}

			<SettingItem name="Export Formats">
				<button onClick={addExport} className="mod-cta">
					Add Export Format
				</button>
			</SettingItem>
			{exportFormatState.map((f, i) => {
				return (
					<ExportFormatSettings
						key={i}
						format={f}
						index={i}
						updateFormat={updateExport}
						removeFormat={removeExport}
					/>
				);
			})}
		</>
	);
}

export class ZoteroConnectorSettingsTab extends PluginSettingTab {
	plugin: ZoteroConnector;
	dbTimer: number;

	constructor(app: App, plugin: ZoteroConnector) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		ReactDOM.render(
			<SettingsComponent
				settings={this.plugin.settings}
				addCiteFormat={this.addCiteFormat}
				updateCiteFormat={this.updateCiteFormat}
				removeCiteFormat={this.removeCiteFormat}
				addExportFormat={this.addExportFormat}
				updateExportFormat={this.updateExportFormat}
				removeExportFormat={this.removeExportFormat}
				updateSetting={this.updateSetting}
			/>,
			this.containerEl
		);
	}

	addCiteFormat = (format: CitationFormat) => {
		this.plugin.addFormatCommand(format);
		this.plugin.settings.citeFormats.push(format);
		this.debouncedSave();

		return this.plugin.settings.citeFormats.slice();
	};

	updateCiteFormat = (index: number, format: CitationFormat) => {
		this.plugin.removeFormatCommand(
			this.plugin.settings.citeFormats[index]
		);
		this.plugin.addFormatCommand(format);
		this.plugin.settings.citeFormats[index] = format;
		this.debouncedSave();

		return this.plugin.settings.citeFormats.slice();
	};

	removeCiteFormat = (index: number) => {
		this.plugin.removeFormatCommand(
			this.plugin.settings.citeFormats[index]
		);
		this.plugin.settings.citeFormats.splice(index, 1);
		this.debouncedSave();

		return this.plugin.settings.citeFormats.slice();
	};

	addExportFormat = (format: ExportFormat) => {
		this.plugin.addExportCommand(format);
		this.plugin.settings.exportFormats.push(format);
		this.debouncedSave();

		return this.plugin.settings.exportFormats.slice();
	};

	updateExportFormat = (index: number, format: ExportFormat) => {
		this.plugin.removeExportCommand(
			this.plugin.settings.exportFormats[index]
		);
		this.plugin.addExportCommand(format);
		this.plugin.settings.exportFormats[index] = format;
		this.debouncedSave();

		return this.plugin.settings.exportFormats.slice();
	};

	removeExportFormat = (index: number) => {
		this.plugin.removeExportCommand(
			this.plugin.settings.exportFormats[index]
		);
		this.plugin.settings.exportFormats.splice(index, 1);
		this.debouncedSave();

		return this.plugin.settings.exportFormats.slice();
	};

	updateSetting = <T extends keyof ZoteroConnectorSettings>(
		key: T,
		value: ZoteroConnectorSettings[T]
	) => {
		this.plugin.settings[key] = value;
		this.debouncedSave();
	};

	debouncedSave() {
		clearTimeout(this.dbTimer);
		this.dbTimer = window.setTimeout(() => {
			this.plugin.saveSettings();
		}, 150);
	}

	hide() {
		super.hide();
		ReactDOM.unmountComponentAtNode(this.containerEl);
	}
}
