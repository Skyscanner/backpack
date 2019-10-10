/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
const https = require('https');

const cliProgress = require('cli-progress');

const bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);

let packagesDataFetched = 0;

const readdir = util.promisify(fs.readdir);

const meta = require('../../meta.json');

let failures = false;

const owners = meta.maintainers.map(maintainer => maintainer.npm).sort();

const packageDone = () => {
  packagesDataFetched += 1;
  bar.update(packagesDataFetched);
};

const getPackageMaintainers = pkg =>
  new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${pkg}/`, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', d => {
        body += d;
      });
      res.on('error', reject);
      res.on('end', () => {
        const pkgData = JSON.parse(body);

        if (pkgData.maintainers) {
          packageDone();
          resolve({
            name: pkg,
            maintainers: pkgData.maintainers.map(m => m.name),
            new: false,
          });
        } else {
          packageDone();
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

readdir('packages/')
  .then(packages => packages.filter(i => !i.startsWith('.')))
  .then(packages => {
    bar.start(packages.length, 0);
    return packages;
  })
  .then(packages => Promise.all(packages.map(getPackageMaintainers)))
  .then(packages => {
    bar.stop();
    console.log('');
    return packages;
  })
  .then(maintainers => maintainers.forEach(verifyMaintainers))
  .then(() => {
    if (failures) {
      console.log(
        '\nPlease fix your maintainer list before publishing. Link: https://www.npmjs.com/settings/skyscanner/teams/team/backpack/access',
      );
      process.exit(1);
    } else {
      console.log('\nAll good 👍');
      process.exit(0);
    }
  })
  .catch(error => {
    console.error(
      'An unknown error occured. Please check your network connection and try again.',
    );
    if (error) {
      console.error(error);
    }
    process.exit(1);
  });
