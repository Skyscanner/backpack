const p = require('path');

const chokidar = require('chokidar');

const { compile } = require('./style-compiler');

const DIR_GLOB = './{packages,examples}/bpk-component-*/**/*.scss';

// eslint-disable-next-line no-console
console.log(`start watching ${DIR_GLOB}`);
// Watch app directory for changes to scss files.
const watcher = chokidar.watch(DIR_GLOB);
// Something to use when events are received.

// eslint-disable-next-line no-console
const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', (path) => {
    log(`File ${path} has been added`);
    compile(path).catch(e => {
      log(e);
    });
  })
  .on('change', (path) => {
    log(`File ${path} has been changed`);
    compile(path).catch(e => {
      log(e);
    });
  })
  .on('unlink', (path) => log(`File ${path} has been removed`));

// Watch CSS deletes & recompile corresponding scss
chokidar.watch('./{packages,examples}/bpk-*/**/[!_]*.css').on('unlink', (path) => {
  log(`File ${path} has been removed`);
  const { dir, name } = p.parse(path);
  const newPath = p.format({ dir, name, ext: '.scss' });
  compile(newPath).catch(e => {
    log(e);
  });
});
