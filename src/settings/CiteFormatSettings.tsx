import React from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import { CitationFormat, Format } from '../types';
import { cslListRaw } from './cslList';
import { Icon } from './Icon';
import {
  NoOptionMessage,
  customSelectStyles,
  loadCSLOptions,
} from './select.helpers';

interface FormatSettingsProps {
  format: CitationFormat;
  index: number;
  removeFormat: (index: number) => void;
  updateFormat: (index: number, format: CitationFormat) => void;
}

export function CiteFormatSettings({
  format,
  index,
  updateFormat,
  removeFormat,
}: FormatSettingsProps) {
  const defaultStyle = React.useMemo(() => {
    if (!format.cslStyle) return undefined;

    const match = cslListRaw.find((item) => item.value === format.cslStyle);

    if (match) return match;

    return { label: format.cslStyle, value: format.cslStyle };
  }, [format.cslStyle]);

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

      if (e.target.value === 'latex') {
        newFormat.command = 'cite';
      } else if (e.target.value === 'biblatex') {
        newFormat.command = 'autocite';
      } else if (newFormat.command) {
        delete newFormat.command;
      }

      if (newFormat.format !== 'pandoc' && newFormat.brackets) {
        delete newFormat.brackets;
      }

      updateFormat(index, newFormat);
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
          <input onChange={onChangeName} type="text" value={format.name} />
          <div className="zt-format__delete">
            <button className="zt-format__delete-btn" onClick={onRemove}>
              <Icon name="trash" />
            </button>
          </div>
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
            <option value="formatted-citation">Formatted Citation</option>
            <option value="formatted-bibliography">
              Formatted Bibliography
            </option>
          </select>
        </div>
      </div>

      {['formatted-citation', 'formatted-bibliography'].contains(
        format.format
      ) && (
        <div className="zt-format__form">
          <div className="zt-format__label">Citation Style</div>
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
      )}

      {['latex', 'biblatex'].contains(format.format) && (
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

      {format.format === 'pandoc' && (
        <div className="zt-format__form">
          <div className="zt-format__label">Include Brackets</div>
          <div className="zt-format__input-wrapper">
            <div
              onClick={onChangeBrackets}
              className={`checkbox-container${
                format.brackets ? ' is-enabled' : ''
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
