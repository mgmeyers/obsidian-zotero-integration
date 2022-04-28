const fs = require('fs');
const convert = require('xml-js');

function readFiles(dirname, onFileContent, onError, done) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    for (let filename of filenames) {
      if (!filename.endsWith('.csl')) continue;
      const content = fs.readFileSync(dirname + filename);
      onFileContent(filename, convert.xml2js(content.toString()));
    }

    done();
  });
}

const seen = {};
const cslList = [];

readFiles(
  '../styles/',
  function (filename, content) {
    if (content && content.elements) {
      const style = content.elements.find((el) => el.name === 'style');

      if (style) {
        const info = style.elements.find((el) => el.name === 'info');

        if (info) {
          const styleLink = info.elements.find(
            (el) => el.name === 'link' && el.attributes.rel === 'self'
          );
          const titleEl = info.elements.find((el) => el.name === 'title');
          const title = titleEl.elements[0].text;
          const id = styleLink.attributes.href.split('/').pop();

          if (!seen[id]) {
            cslList.push({ value: id, label: title });
            seen[id] = true;
          }
        }
      }
    }
  },
  function (err) {
    throw err;
  },
  function () {
    readFiles(
      '../jm-styles/',
      function (filename, content) {
        if (content && content.elements) {
          const style = content.elements.find((el) => el.name === 'style');

          if (style) {
            const info = style.elements.find((el) => el.name === 'info');

            if (info) {
              const styleLink = info.elements.find(
                (el) => el.name === 'link' && el.attributes.rel === 'self'
              );
              const titleEl = info.elements.find((el) => el.name === 'title');
              const title = titleEl.elements[0].text;
              const id = styleLink.attributes.href.split('/').pop();

              if (!seen[id]) {
                cslList.push({ value: id, label: title });
                seen[id] = true;
              }
            }
          }
        }
      },
      function (err) {
        throw err;
      },
      function () {
        fs.writeFileSync(
          './src/settings/cslList.ts',
          `import Fuse from 'fuse.js';

export const cslListRaw = ${JSON.stringify(cslList, null, 2)};

export const cslList = new Fuse(cslListRaw, {
  keys: ['label'],
  minMatchCharLength: 3,
});
`
        );
      }
    );
  }
);
