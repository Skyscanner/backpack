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

const { execSync } = require('child_process');
const fs = require('fs');

const updateImports = (file, findReplaces) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      let result = data;
      findReplaces.forEach((fr) => {
        const splitFile = result.split(fr.find);
        if (splitFile.length === 1) {
          return;
        }
        result = splitFile.join(fr.replace);
      });

      fs.writeFile(file, result, 'utf8', (err2) => {
        if (err2) return reject(err2);
        return resolve();
      });
    });
  });

// eslint-disable-next-line no-console
console.log('Crunching import paths...');
// eslint-disable-next-line no-console
console.log('');

const findReplaces = [{ find: '.module.scss', replace: '.module.css' }];

const jsFiles = execSync(
  'find dist -name "*.js" -o -name "*.jsx" -name "*.ts" -o -name "*.tsx" | grep -v node_modules',
)
  .toString()
  .split('\n')
  .filter((s) => s !== '');

const updatePromises = jsFiles.map((jF) => updateImports(jF, findReplaces));

Promise.all(updatePromises)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('All good.  👍');
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
