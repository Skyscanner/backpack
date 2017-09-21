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

/* eslint-disable no-console */
/* eslint-disable comma-dangle */

const fs = require('fs');
const http = require('http');
const Q = require('q');

const readdir = Q.denodeify(fs.readdir);

const maintainers = fs.readFileSync('NPM_OWNERS', { encoding: 'utf-8' })
                      .split('\n')
                      .filter(s => s.trim() !== '')
                      .sort();

let failures = false;

const getPackageMaintainers = (pkg) => {
  const deferred = Q.defer();
  http.get(`http://registry.npmjs.org/${pkg}/`, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (d) => {
      body += d;
    });
    res.on('error', deferred.reject);
    res.on('end', () => {
      const pkgData = JSON.parse(body);

      if (pkgData.maintainers) {
        deferred.resolve({
          name: pkg,
          maintainers: pkgData.maintainers.map(m => m.name),
          new: false,
        });
      } else {
        deferred.resolve({
          name: pkg,
          new: true,
        });
      }
    });
  });
  return deferred.promise;
};

const verifyMaintainers = (data) => {
  if (data.new) {
    console.log(`${data.name} ⁇\n  Package does not seem to be in NPM registry (yet)`);
    return;
  }
  if (data.maintainers.sort().join('') === maintainers.join('')) {
    // all good
    console.log(`${data.name} ✔︎`);
  } else {
    console.log(
      `${data.name}\n  Expected\n    ${maintainers.join(', ')}\n  but got\n    ${data.maintainers.sort().join(', ')}`
    );
    process.exitCode = 1;
    failures = true;
  }
};

console.log(`Maintainers are:\n  ${maintainers.join('\n  ')}\n`);

Q.all([readdir('packages/'), readdir('native/packages/')])
   // Q.all returns the results as an array, so destructure them all into one array.
  .then(packages => Q.all([...packages[0], ...packages[1]].map(getPackageMaintainers)))
  .then(packages => packages.forEach(verifyMaintainers))
  .then(() => {
    if (failures) {
      console.log('\nPlease fix your maintainer list before publishing.');
    } else {
      console.log('\nAll good 👍');
    }
  });
