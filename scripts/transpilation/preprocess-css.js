const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');

module.exports = function processSass(data, filename) {
  let result;

  try {
    result = sass.renderSync({
      data,
      file: filename,
      importer: packageImporter(),
      outputStyle: 'compressed',
    }).css;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return result.toString('utf8');
};
