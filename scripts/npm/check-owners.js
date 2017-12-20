/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

/* @flow */

/* eslint-disable no-console */

const fs = require('fs');
const util = require('util');
const http = require('http');

const readdir = util.promisify(fs.readdir);

let failures = false;

const owners = fs
  .readFileSync('NPM_OWNERS', { encoding: 'utf-8' })
  .split('\n')
  .filter(s => s.trim() !== '')
  .sort();

const getPackageMaintainers = pkg =>
  new Promise((resolve, reject) => {
    http.get(`http://registry.npmjs.org/${pkg}/`, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', d => {
        body += d;
      });
      res.on('error', reject);
      res.on('end', () => {
        const pkgData = JSON.parse(body);

        if (pkgData.maintainers) {
          resolve({
            name: pkg,
            maintainers: pkgData.maintainers.map(m => m.name),
            new: false,
          });
        } else {
          resolve({
            name: pkg,
            new: true,
          });
        }
      });
    });
  });

const verifyMaintainers = data => {
  if (data.new) {
    console.log(
      `${data.name} ⁇\n  Package does not seem to be in NPM registry (yet)`,
    );
    return;
  }

  const sortedMaintainers = data.maintainers.sort();

  if (sortedMaintainers.join('') === owners.join('')) {
    console.log(`${data.name} ✔︎`);
  } else {
    console.log(
      `${data.name}\n  Expected\n    ${owners.join(
        ', ',
      )}\n  but got\n    ${sortedMaintainers.join(', ')}`,
    );
    process.exitCode = 1;
    failures = true;
  }
};

console.log(`Maintainers are:\n  ${owners.join('\n  ')}\n`);

Promise.all([readdir('packages/'), readdir('native/packages/')])
  .then(packages =>
    Promise.all([...packages[0], ...packages[1]].map(getPackageMaintainers)),
  )
  .then(maintainers => maintainers.forEach(verifyMaintainers))
  .then(() => {
    if (failures) {
      console.log('\nPlease fix your maintainer list before publishing.');
    } else {
      console.log('\nAll good 👍');
    }
  });
