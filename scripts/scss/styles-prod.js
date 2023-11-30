const glob = require('glob');

const { compile } = require('./style-compiler');

const DIR_GLOB = './{packages,examples}/bpk-*/**/[!_]*.scss';

glob(DIR_GLOB, {}, (err, files) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  files.forEach(compile);
});
