import React from "react";
import { MultiValue, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

import { ExportFormat } from "../types";
import { cslListRaw } from "./cslList";
import { Icon } from "./Icon";
import {
	customSelectStyles,
	loadCSLOptions,
	NoOptionMessage,
} from "./select.helpers";

interface FormatSettingsProps {
	format: ExportFormat;
	index: number;
	removeFormat: (index: number) => void;
	updateFormat: (index: number, format: ExportFormat) => void;
}

// const typeOptions = [
// 	{ value: "annotation", label: "Annotation" },
// 	{ value: "artwork", label: "Artwork" },
// 	{ value: "attachment", label: "Attachment" },
// 	{ value: "audioRecording", label: "Audio Recording" },
// 	{ value: "bill", label: "Bill" },
// 	{ value: "blogPost", label: "Blog Post" },
// 	{ value: "book", label: "Book" },
// 	{ value: "bookSection", label: "Book Section" },
// 	{ value: "case", label: "Case" },
// 	{ value: "classic", label: "Classic" },
// 	{ value: "computerProgram", label: "Software" },
// 	{ value: "conferencePaper", label: "Conference Paper" },
// 	{ value: "dictionaryEntry", label: "Dictionary Entry" },
// 	{ value: "document", label: "Document" },
// 	{ value: "email", label: "E-mail" },
// 	{ value: "encyclopediaArticle", label: "Encyclopedia Article" },
// 	{ value: "film", label: "Film" },
// 	{ value: "forumPost", label: "Forum Post" },
// 	{ value: "gazette", label: "Gazette" },
// 	{ value: "hearing", label: "Hearing" },
// 	{ value: "instantMessage", label: "Instant Message" },
// 	{ value: "interview", label: "Interview" },
// 	{ value: "journalArticle", label: "Journal Article" },
// 	{ value: "legalCommentary", label: "Legal Commentary" },
// 	{ value: "letter", label: "Letter" },
// 	{ value: "magazineArticle", label: "Magazine Article" },
// 	{ value: "manuscript", label: "Manuscript" },
// 	{ value: "map", label: "Map" },
// 	{ value: "newspaperArticle", label: "Newspaper Article" },
// 	{ value: "note", label: "Note" },
// 	{ value: "patent", label: "Patent" },
// 	{ value: "periodical", label: "Periodical" },
// 	{ value: "podcast", label: "Podcast" },
// 	{ value: "preprint", label: "Preprint" },
// 	{ value: "presentation", label: "Presentation" },
// 	{ value: "radioBroadcast", label: "Radio Broadcast" },
// 	{ value: "regulation", label: "Regulation" },
// 	{ value: "report", label: "Report" },
// 	{ value: "standard", label: "Standard" },
// 	{ value: "statute", label: "Statute" },
// 	{ value: "thesis", label: "Thesis" },
// 	{ value: "treaty", label: "Treaty" },
// 	{ value: "tvBroadcast", label: "TV Broadcast" },
// 	{ value: "videoRecording", label: "Video Recording" },
// 	{ value: "webpage", label: "Web Page" },
// ];

export function ExportFormatSettings({
	format,
	index,
	updateFormat,
	removeFormat,
}: FormatSettingsProps) {
	const defaultStyle = React.useMemo(() => {
		return cslListRaw.find((item) => item.value === format.cslStyle);
	}, [format.cslStyle]);

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

	const onChangeCSLStyle = React.useCallback(
		(e: SingleValue<{ value: string; label: string }>) => {
			updateFormat(index, {
				...format,
				cslStyle: e?.value,
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
					<div className="zt-format__delete">
						<button
							className="zt-format__delete-btn"
							onClick={onRemove}
						>
							<Icon name="trash" />
						</button>
					</div>
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
				<div className="zt-format__input-note">
					The file path of the exported markdown. Supports templating,
					eg <pre>My Folder/{"{{citekey}}"}.md</pre>. Templates have
					access to data from the Zotero item and the current
					attachment.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Image Output Path</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="imageOutputPathTemplate"
						value={format.imageOutputPathTemplate}
					/>
				</div>
				<div className="zt-format__input-note">
					The folder in which images should be saved. Supports
					templating, eg <pre>Assets/{"{{citekey}}"}/</pre>. Templates
					have access to data from the Zotero item and the current
					attachment.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Image Base Name</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="imageBaseNameTemplate"
						value={format.imageBaseNameTemplate}
					/>
				</div>
				<div className="zt-format__input-note">
					The base file name of exported images. Eg. <pre>image</pre>{" "}
					will result in <pre>image-1-x123-y456.jpg</pre> where <pre>1</pre> is
					the page number and <pre>x123</pre> and <pre>y456</pre> are the x and y
					coordinates of rectangle annotation on the page. Supports
					templating. Templates have access to data from the Zotero
					item and the current attachment.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Header Template File</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="headerTemplatePath"
						value={format.headerTemplatePath}
					/>
				</div>
				<div className="zt-format__input-note">
					Open the data explorer from the command pallet to see
					available template data. Templates are written using{" "}
					<a
						href="https://mozilla.github.io/nunjucks/templating.html#variables"
						target="_blank"
					>
						Nunjucks
					</a>
					.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Annotation Template File</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="annotationTemplatePath"
						value={format.annotationTemplatePath}
					/>
				</div>
				<div className="zt-format__input-note">
					Open the data explorer from the command pallet to see
					available template data. Templates are written using{" "}
					<a
						href="https://mozilla.github.io/nunjucks/templating.html#variables"
						target="_blank"
					>
						Nunjucks
					</a>
					.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Footer Template File</div>
				<div className="zt-format__input-wrapper">
					<input
						onChange={onChangeStr}
						type="text"
						data-key="footerTemplatePath"
						value={format.footerTemplatePath}
					/>
				</div>
				<div className="zt-format__input-note">
					Open the data explorer from the command pallet to see
					available template data. Templates are written using{" "}
					<a
						href="https://mozilla.github.io/nunjucks/templating.html#variables"
						target="_blank"
					>
						Nunjucks
					</a>
					.
				</div>
			</div>

			<div className="zt-format__form">
				<div className="zt-format__label">Bilbiography Style</div>
				<div className="zt-format__input-wrapper">
					<AsyncSelect
						noOptionsMessage={NoOptionMessage}
						placeholder="Search..."
						cacheOptions
						defaultValue={defaultStyle}
						className="zt-multiselect"
						loadOptions={loadCSLOptions}
						isClearable
						onChange={onChangeCSLStyle}
						styles={customSelectStyles}
					/>
				</div>
				<div className="zt-format__input-note">
					Note, the chosen style must be installed in Zotero. See{" "}
					<a
						target="_blank"
						href="https://www.zotero.org/support/styles"
					>
						Zotero: Citation Styles
					</a>
				</div>
			</div>
		</div>
	);
}
