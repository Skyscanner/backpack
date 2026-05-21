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
const fs = require("fs");

// eslint-disable-next-line no-console
console.log('Copying bpk-mixins...');

execSync(`cp -r packages/backpack-web/src/bpk-mixins packages/backpack-web/dist/bpk-mixins`);
execSync(`rm -f packages/backpack-web/dist/bpk-mixins/README.md`);

// eslint-disable-next-line no-console
console.log('bpk-mixins copied.  👍');

// eslint-disable-next-line no-console
console.log('Copying bpk-stylesheets files...');

if (!fs.existsSync('packages/backpack-web/dist/bpk-stylesheets')) {
  execSync(`mkdir packages/backpack-web/dist/bpk-stylesheets`);
}

const styleFiles = execSync('find packages/backpack-web/src/bpk-stylesheets -name "*.scss" -o -name "*.js" -o -name "*.css" | grep -v  "webpack.config.babel.js" | grep -v "build.js"').toString()
  .split('\n')
  .filter((s) => s !== '');

styleFiles.forEach((styleFile) => {
  const component = styleFile.split('packages/backpack-web/src/bpk-stylesheets/')[1];
  execSync(`cp ${styleFile} packages/backpack-web/dist/bpk-stylesheets/${component}`);
})

// eslint-disable-next-line no-console
console.log('bpk-stylesheets copied.  👍');
