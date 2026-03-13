import React from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import { ExportFormat } from '../types';
import { Icon } from './Icon';
import { SettingItem } from './SettingItem';
import { cslListRaw } from './cslList';
import {
  NoFileOptionMessage,
  NoOptionMessage,
  buildFileSearch,
  buildLoadFileOptions,
  customSelectStyles,
  loadCSLOptions,
} from './select.helpers';

interface FormatSettingsProps {
  format: ExportFormat;
  index: number;
  removeFormat: (index: number) => void;
  updateFormat: (index: number, format: ExportFormat) => void;
}

export function ExportFormatSettings({
  format,
  index,
  updateFormat,
  removeFormat,
}: FormatSettingsProps) {
  const loadFileOptions = React.useMemo(() => {
    const fileSearch = buildFileSearch();
    return buildLoadFileOptions(fileSearch);
  }, []);

  const defaultTemplate = React.useMemo(() => {
    if (!format.templatePath) return undefined;

    const file = app.vault
      .getMarkdownFiles()
      .find((item) => item.path === format.templatePath);
    return file ? { value: file.path, label: file.path } : undefined;
  }, [format.templatePath]);

  const defaultStyle = React.useMemo(() => {
    if (!format.cslStyle) return undefined;

    const match = cslListRaw.find((item) => item.value === format.cslStyle);

    if (match) return match;

    return { label: format.cslStyle, value: format.cslStyle };
  }, [format.cslStyle]);

  const onChangeStr = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const key = (e.target as HTMLInputElement).dataset
        .key as keyof ExportFormat;
      updateFormat(index, {
        ...format,
        [key]: (e.target as HTMLInputElement).value,
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

  const onChangeTemplatePath = React.useCallback(
    (e: SingleValue<{ value: string; label: string }>) => {
      updateFormat(index, {
        ...format,
        templatePath: e?.value,
      });
    },
    [updateFormat, index, format]
  );

  const onChangeDateAsString = React.useCallback(
    (e: SingleValue<{ value: boolean; label: string }>) => {
      updateFormat(index, {
        ...format,
        dateAsString: e?.value,
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
            <button className="zt-format__delete-btn" onClick={onRemove}>
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
          The file path of the exported markdown. Supports templating, eg{' '}
          <pre>My Folder/{'{{citekey}}'}.md</pre>. Templates have access to data
          from the Zotero item and its first attachment.
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
          The folder in which images should be saved. Supports templating, eg{' '}
          <pre>Assets/{'{{citekey}}'}/</pre>. Templates have access to data from
          the Zotero item and its first attachment.
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
          The base file name of exported images. Eg. <pre>image</pre> will
          result in <pre>image-1-x123-y456.jpg</pre> where <pre>1</pre> is the
          page number and <pre>x123</pre> and <pre>y456</pre> are the x and y
          coordinates of rectangle annotation on the page. Supports templating.
          Templates have access to data from the Zotero item and its first
          attachment.
        </div>
      </div>

      <div className="zt-format__form">
        <div className="zt-format__label">Template File</div>
        <div className="zt-format__input-wrapper">
          <AsyncSelect
            noOptionsMessage={NoFileOptionMessage}
            placeholder="Search..."
            cacheOptions
            defaultValue={defaultTemplate}
            className="zt-multiselect"
            loadOptions={loadFileOptions}
            isClearable
            onChange={onChangeTemplatePath}
            styles={customSelectStyles}
          />
        </div>
        <div className="zt-format__input-note">
          Open the data explorer from the command pallet to see available
          template data. Templates are written using{' '}
          <a
            href="https://mozilla.github.io/nunjucks/templating.html#variables"
            target="_blank"
            rel="noreferrer"
          >
            Nunjucks
          </a>
          .{' '}
          <a
            href="https://github.com/mgmeyers/obsidian-zotero-integration/blob/main/docs/Templating.md"
            target="_blank"
            rel="noreferrer"
          >
            See the templating documentation here
          </a>
          .
        </div>
      </div>

      {format.headerTemplatePath && (
        <div className="zt-format__form is-deprecated">
          <div className="zt-format__label">
            Header Template File (deprecated)
          </div>
          <div className="zt-format__input-wrapper">
            <input type="text" disabled value={format.headerTemplatePath} />
            <button
              className="mod-warning"
              onClick={() => {
                updateFormat(index, {
                  ...format,
                  headerTemplatePath: undefined,
                });
              }}
            >
              Remove Template
            </button>
          </div>
          <div className="zt-format__input-note">
            Deprecated: Separate template files are no longer needed.{' '}
            <a
              href="https://github.com/mgmeyers/obsidian-zotero-integration/blob/main/docs/Templating.md"
              target="_blank"
              rel="noreferrer"
            >
              See the templating documentation here
            </a>
            .
          </div>
        </div>
      )}

      {format.annotationTemplatePath && (
        <div className="zt-format__form is-deprecated">
          <div className="zt-format__label">
            Annotation Template File (deprecated)
          </div>
          <div className="zt-format__input-wrapper">
            <input type="text" disabled value={format.annotationTemplatePath} />
            <button
              className="mod-warning"
              onClick={() => {
                updateFormat(index, {
                  ...format,
                  annotationTemplatePath: undefined,
                });
              }}
            >
              Remove Template
            </button>
          </div>
          <div className="zt-format__input-note">
            Deprecated: Separate template files are no longer needed.{' '}
            <a
              href="https://github.com/mgmeyers/obsidian-zotero-integration/blob/main/docs/Templating.md"
              target="_blank"
              rel="noreferrer"
            >
              See the templating documentation here
            </a>
            .
          </div>
        </div>
      )}

      {format.footerTemplatePath && (
        <div className="zt-format__form is-deprecated">
          <div className="zt-format__label">
            Footer Template File (deprecated)
          </div>
          <div className="zt-format__input-wrapper">
            <input type="text" disabled value={format.footerTemplatePath} />
            <button
              className="mod-warning"
              onClick={() => {
                updateFormat(index, {
                  ...format,
                  footerTemplatePath: undefined,
                });
              }}
            >
              Remove Template
            </button>
          </div>
          <div className="zt-format__input-note">
            Deprecated: Separate template files are no longer needed.{' '}
            <a
              href="https://github.com/mgmeyers/obsidian-zotero-integration/blob/main/docs/Templating.md"
              target="_blank"
              rel="noreferrer"
            >
              See the templating documentation here
            </a>
            .
          </div>
        </div>
      )}

      <div className="zt-format__form">
        <div className="zt-format__label">Bibliography Style</div>
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
          Note, the chosen style must be installed in Zotero. See{' '}
          <a
            target="_blank"
            href="https://www.zotero.org/support/styles"
            rel="noreferrer"
          >
            Zotero: Citation Styles
          </a>
        </div>
      </div>

      <div className="zt-format__form">
        <div className="zt-format__label">
          Import "date" field as ISO 8601 string
        </div>
        <div className="zt-format__input-wrapper">
          <SettingItem
            description={`Imports the date field as an ISO 8601 string instead of a UNIX timestamp. Allows for reduced accuracy of dates, e.g. "2021-04".`}
          >
            <div
              onClick={() =>
                onChangeDateAsString({
                  value: !format.dateAsString,
                  label: (!format.dateAsString).toString(),
                })
              }
              className={`checkbox-container${
                format.dateAsString ? ' is-enabled' : ''
              }`}
            />
          </SettingItem>
        </div>
        <div className="zt-format__input-note">
          Note, if you turn this on: Don't use{' '}
          <pre>{`{{date | format(...)}}`}</pre> in your template or it will
          generate an error message into your output.
        </div>
      </div>
    </div>
  );
}
