import { App, PluginSettingTab } from "obsidian";
import React from "react";
import ReactDOM from "react-dom";
import ZoteroConnector from "./main";
import { CitationFormat, Format, ZoteroConnectorSettings } from "./types";

import { setIcon } from "obsidian";

interface IconProps {
	name: string;
	className?: string;
}

function Icon({ name, className }: IconProps) {
	return (
		<span
			data-icon={name}
			className={className}
			ref={(c) => {
				if (c) {
					setIcon(c, name);
				}
			}}
		/>
	);
}

interface ItemInfo {
	name?: string;
	description?: string;
}

function SettingItemInfo({ name, description }: ItemInfo) {
	return (
		<div className="setting-item-info">
			<div className="setting-item-name">{name}</div>
			<div className="setting-item-description">{description}</div>
		</div>
	);
}

function SettingItem({
	name,
	description,
	children,
}: React.PropsWithChildren<ItemInfo>) {
	return (
		<div className="setting-item">
			<SettingItemInfo name={name} description={description} />
			<div className="setting-item-control">{children}</div>
		</div>
	);
}

interface FormatSettingsProps {
	format: CitationFormat;
	index: number;
	removeFormat: (index: number) => void;
	updateFormat: (index: number, format: CitationFormat) => void;
}

function FormatSettings({
	format,
	index,
	updateFormat,
	removeFormat,
}: FormatSettingsProps) {
	const onChangeName = React.useCallback(
		(e) => {
			updateFormat(index, {
				...format,
				name: e.target.value,
			});
		},
		[updateFormat, index, format]
	);

	const onChangeFormat = React.useCallback(
		(e) => {
			const newFormat = {
				...format,
				format: e.target.value as Format,
			};

			if (e.target.value === "latex") {
				newFormat.command = "cite";
			} else if (e.target.value === "biblatex") {
				newFormat.command = "autocite";
			} else if (newFormat.command) {
				delete newFormat.command;
			}

			if (newFormat.format !== "pandoc" && newFormat.brackets) {
				delete newFormat.brackets;
			}

			updateFormat(index, newFormat);
		},
		[updateFormat, index, format]
	);

	const onChangeCommand = React.useCallback(
		(e) => {
			updateFormat(index, {
				...format,
				command: e.target.value,
			});
		},
		[updateFormat, index, format]
	);

	const onChangeBrackets = React.useCallback(() => {
		updateFormat(index, {
			...format,
			brackets: !format.brackets,
		});
	}, [updateFormat, index, format]);

	const onRemove = React.useCallback(() => {
		removeFormat(index);
	}, [removeFormat, index]);

	return (
		<div className="zt-format">
			<div className="zt-format__form">
				<div className="zt-format__label">Name</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeName}
						type="text"
						value={format.name}
					/>
				</div>
				<div className="zt-format__delete">
					<button
						className="zt-format__delete-btn"
						onClick={onRemove}
					>
						<Icon name="trash" />
					</button>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Output Format</div>
				<div className="zt-format__input-wrapper">
					<select
						className="dropdown"
						defaultValue={format.format}
						onChange={onChangeFormat}
					>
						<option value="latex">LaTeX</option>
						<option value="biblatex">BibLaTeX</option>
						<option value="pandoc">Pandoc</option>
						<option value="formatted-citation">
							Quick Copy Citation
						</option>
						<option value="formatted-bibliography">
							Quick Copy Bibliography
						</option>
					</select>
				</div>
			</div>

			{["latex", "biblatex"].contains(format.format) && (
				<div className="zt-format__form">
					<div className="zt-format__label">Citation Command</div>
					<div className="zt-format__input-wrapper">
						<input
							type="text"
							value={format.command}
							onChange={onChangeCommand}
						/>
					</div>
				</div>
			)}

			{format.format === "pandoc" && (
				<div className="zt-format__form">
					<div className="zt-format__label">Include Brackets</div>
					<div className="zt-format__input-wrapper">
						<div
							onClick={onChangeBrackets}
							className={`checkbox-container${
								format.brackets ? " is-enabled" : ""
							}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

interface SettingsComponentProps {
	settings: ZoteroConnectorSettings;
	addFormat: (format: CitationFormat) => CitationFormat[];
	updateFormat: (index: number, format: CitationFormat) => CitationFormat[];
	removeFormat: (index: number) => CitationFormat[];
	updateSetting: (key: keyof ZoteroConnectorSettings, value: any) => void;
}

function SettingsComponent({
	settings,
	addFormat,
	updateFormat,
	removeFormat,
	updateSetting,
}: SettingsComponentProps) {
	const [formatState, setFormatState] = React.useState(settings.formats);

	const update = React.useCallback(
		(index: number, format: CitationFormat) => {
			setFormatState(updateFormat(index, format));
		},
		[updateFormat]
	);

	const add = React.useCallback(() => {
		setFormatState(
			addFormat({
				name: `Format #${formatState.length}`,
				format: "formatted-citation",
			})
		);
	}, [addFormat, formatState]);

	const remove = React.useCallback(
		(index: number) => {
			setFormatState(removeFormat(index));
		},
		[removeFormat]
	);

	return (
		<>
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
			<SettingItem name="Citation Formats">
				<button onClick={add} className="mod-cta">
					Add Citation Format
				</button>
			</SettingItem>
			{formatState.map((f, i) => {
				return (
					<FormatSettings
						key={i}
						format={f}
						index={i}
						updateFormat={update}
						removeFormat={remove}
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
				addFormat={this.addFormat}
				updateFormat={this.updateFormat}
				removeFormat={this.removeFormat}
				updateSetting={this.updateSetting}
			/>,
			this.containerEl
		);
	}

	addFormat = (format: CitationFormat) => {
		this.plugin.addFormatCommand(format);
		this.plugin.settings.formats.push(format);
		this.debouncedSave();

		return this.plugin.settings.formats.slice();
	};

	updateFormat = (index: number, format: CitationFormat) => {
		this.plugin.removeFormatCommand(this.plugin.settings.formats[index]);
		this.plugin.addFormatCommand(format);
		this.plugin.settings.formats[index] = format;
		this.debouncedSave();

		return this.plugin.settings.formats.slice();
	};

	removeFormat = (index: number) => {
		this.plugin.removeFormatCommand(this.plugin.settings.formats[index]);
		this.plugin.settings.formats.splice(index, 1);
		this.debouncedSave();

		return this.plugin.settings.formats.slice();
	};

	updateSetting = (key: keyof ZoteroConnectorSettings, value: any) => {
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
