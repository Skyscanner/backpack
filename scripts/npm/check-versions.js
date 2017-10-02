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

const { execSync } = require('child_process');

const checkVersion = (command, name, expected) => {
  let version = null;

  try {
    version = execSync(command).toString().replace('v', '').trim();
  } catch (e) {
    console.log(`Unable to get ${name} version!  😱`);
    console.log('');
    process.exit(1);
  }

  if (version !== expected) {
    const contributingLink = 'https://github.com/Skyscanner/backpack/blob/master/contributing.md#getting-started';
    console.log(`Expected ${name} version ${expected}, but got ${version}.  😱`);
    console.log('');
    console.log(`Please follow Backpack's contributing guide (see ${contributingLink}).`);
    console.log('');
    process.exit(1);
  }
};

console.log('Checking Node & npm versions...');
console.log('');

checkVersion('node --version', 'Node', '8.6.0');
checkVersion('npm --version', 'npm', '5.4.2');

console.log('All good.  👍');
console.log('');
