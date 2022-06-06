/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

const fs = require('fs');
const { execSync } = require('child_process');

const updateImports = (file, dirs, appender) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      let result = data;

      dirs.forEach((pkg) => {
        const split = result.split(`from '${pkg}`);
        if (split.length === 1) {
          return;
        }
        result = split.join(`from '${appender}${pkg}`);
      });

      fs.writeFile(file, result, 'utf8', (err2) => {
        if (err2) return reject(err2);
        return resolve();
      });
    });
  });

// eslint-disable-next-line no-console
console.log('Crunching Backpack import paths...');

const dirs = execSync(
  'ls packages | grep -Ev "react-version-test.js|package.json|package-lock.json|node_modules|README.md"',
)
  .toString()
  .split('\n')
  .filter((s) => s !== '');

const jsSrcFiles = execSync(
  'find packages -name "*.js" -o -name "*.jsx" | grep -Ev "node_modules|index.js" --include "*/src"',
)
  .toString()
  .split('\n')
  .filter((s) => s !== '');

const jsRootFiles = execSync(
  'find packages -name "*.js" -o -name "*.jsx" | grep -Ev "node_modules|src"',
)
  .toString()
  .split('\n')
  .filter((s) => s !== '');

const updateSrcFilesPromises = jsSrcFiles.map((jF) =>
  updateImports(jF, dirs, '../../'),
);

const updateRootFilesPromises = jsRootFiles.map((jF) =>
  updateImports(jF, dirs, '../'),
);

Promise.all(updateSrcFilesPromises, updateRootFilesPromises).then(() => {
  // eslint-disable-next-line no-console
  console.log('All good.  👍');
  process.exit(0);
});
