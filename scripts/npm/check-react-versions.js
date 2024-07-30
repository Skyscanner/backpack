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

/* eslint-disable no-console */

const reactDeps = require('../../package.json').devDependencies;

const skyscannerStandard = '18.3.0';
const reactLibs = ['react', 'react-dom'];

const reactVersionErrors = [];

console.log('Checking React versions...');

reactLibs.forEach((lib) => {
  if (reactDeps[lib] !== skyscannerStandard) {
    reactVersionErrors.push(
      `Your version of ${lib} ${reactDeps[lib]} does not match the company version ${skyscannerStandard}`,
    );
  }
});

if (reactVersionErrors.length > 0) {
  console.log('\nThere were React version mismatches');
  console.log(reactVersionErrors.join('\n'));
  process.exit(1);
}

console.log('\nAll react versions match 👍');
process.exit(0);
