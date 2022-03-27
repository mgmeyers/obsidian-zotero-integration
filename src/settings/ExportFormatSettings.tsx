import React from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import { ExportFormat } from "../types";
import { Icon } from "./Icon";

interface FormatSettingsProps {
	format: ExportFormat;
	index: number;
	removeFormat: (index: number) => void;
	updateFormat: (index: number, format: ExportFormat) => void;
}

const typeOptions = [
	{ value: "annotation", label: "Annotation" },
	{ value: "artwork", label: "Artwork" },
	{ value: "attachment", label: "Attachment" },
	{ value: "audioRecording", label: "Audio Recording" },
	{ value: "bill", label: "Bill" },
	{ value: "blogPost", label: "Blog Post" },
	{ value: "book", label: "Book" },
	{ value: "bookSection", label: "Book Section" },
	{ value: "case", label: "Case" },
	{ value: "classic", label: "Classic" },
	{ value: "computerProgram", label: "Software" },
	{ value: "conferencePaper", label: "Conference Paper" },
	{ value: "dictionaryEntry", label: "Dictionary Entry" },
	{ value: "document", label: "Document" },
	{ value: "email", label: "E-mail" },
	{ value: "encyclopediaArticle", label: "Encyclopedia Article" },
	{ value: "film", label: "Film" },
	{ value: "forumPost", label: "Forum Post" },
	{ value: "gazette", label: "Gazette" },
	{ value: "hearing", label: "Hearing" },
	{ value: "instantMessage", label: "Instant Message" },
	{ value: "interview", label: "Interview" },
	{ value: "journalArticle", label: "Journal Article" },
	{ value: "legalCommentary", label: "Legal Commentary" },
	{ value: "letter", label: "Letter" },
	{ value: "magazineArticle", label: "Magazine Article" },
	{ value: "manuscript", label: "Manuscript" },
	{ value: "map", label: "Map" },
	{ value: "newspaperArticle", label: "Newspaper Article" },
	{ value: "note", label: "Note" },
	{ value: "patent", label: "Patent" },
	{ value: "periodical", label: "Periodical" },
	{ value: "podcast", label: "Podcast" },
	{ value: "preprint", label: "Preprint" },
	{ value: "presentation", label: "Presentation" },
	{ value: "radioBroadcast", label: "Radio Broadcast" },
	{ value: "regulation", label: "Regulation" },
	{ value: "report", label: "Report" },
	{ value: "standard", label: "Standard" },
	{ value: "statute", label: "Statute" },
	{ value: "thesis", label: "Thesis" },
	{ value: "treaty", label: "Treaty" },
	{ value: "tvBroadcast", label: "TV Broadcast" },
	{ value: "videoRecording", label: "Video Recording" },
	{ value: "webpage", label: "Web Page" },
];

const customStyles: StylesConfig = {
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

export function ExportFormatSettings({
	format,
	index,
	updateFormat,
	removeFormat,
}: FormatSettingsProps) {
	const onChangeStr = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const key = e.target.dataset.key as keyof ExportFormat;
			updateFormat(index, {
				...format,
				[key]: e.target.value,
			});
		},
		[updateFormat, index, format]
	);

	const onChangeDefault = React.useCallback(() => {
		updateFormat(index, {
			...format,
			isDefault: !format.isDefault,
		});
	}, [updateFormat, index, format]);

	const onChangeTypes = React.useCallback(
		(e: MultiValue<{ value: string; label: string }>) => {
			updateFormat(index, {
				...format,
				zoteroItemTypes: e.map((v) => v.value),
			});
		},
		[updateFormat, index, format]
	);

	const onRemove = React.useCallback(() => {
		removeFormat(index);
	}, [removeFormat, index]);

	return (
		<div className="zt-format">
			<div className="zt-format__form">
				<div className="zt-format__label">Name</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="name"
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
				<div className="zt-format__label">Use as Default Template</div>
				<div className="zt-format__input-wrapper">
					<div
						onClick={onChangeDefault}
						className={`checkbox-container${
							format.isDefault ? " is-enabled" : ""
						}`}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Zotero Item Type</div>
				<div className="zt-format__input-wrapper">
					<Select
						defaultValue={typeOptions.filter((o) =>
							format.zoteroItemTypes.includes(o.value)
						)}
						className="zt-multiselect"
						options={typeOptions}
						isClearable
						isMulti
						isSearchable
						onChange={onChangeTypes}
						styles={customStyles}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Output Path</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="outputPathTemplate"
						value={format.outputPathTemplate}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Asset Output Path</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="assetOutputPathTemplate"
						value={format.assetOutputPathTemplate}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Header Template</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="headerTemplatePath"
						value={format.headerTemplatePath}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Annotation Template</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="annotationTemplatePath"
						value={format.annotationTemplatePath}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Footer Template</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="footerTemplatePath"
						value={format.footerTemplatePath}
					/>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Group By</div>
				<div className="zt-format__input-wrapper">
					<select
						className="dropdown"
						data-key="groupBy"
						defaultValue={format.groupBy}
						onChange={onChangeStr}
					>
						<option value="export-date">Default</option>
						<option value="annotation-date">Annotation Date</option>
						<option value="tag">Tag</option>
						<option value="color">Color</option>
					</select>
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Sort By</div>
				<div className="zt-format__input-wrapper">
					<select
						className="dropdown"
						data-key="groupBy"
						defaultValue={format.groupBy}
						onChange={onChangeStr}
					>
						<option value="location">Default</option>
						<option value="date">Date</option>
						<option value="color">Color</option>
					</select>
				</div>
			</div>
		</div>
	);
}
