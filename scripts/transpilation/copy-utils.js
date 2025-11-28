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

execSync(`cp -r packages/bpk-mixins dist/bpk-mixins`);
execSync(`rm -r dist/bpk-mixins/README.md`);

// eslint-disable-next-line no-console
console.log('bpk-mixins copied.  👍');

// eslint-disable-next-line no-console
console.log('Copying bpk-stylesheets files...');

if (!fs.existsSync('dist/bpk-stylesheets')) {
  execSync(`mkdir dist/bpk-stylesheets`);
}

const styleFiles = execSync('find packages/bpk-stylesheets -name "*.scss" -o -name "*.js" -o -name "*.css" | grep -v  "webpack.config.babel.js" | grep -v "build.js"').toString()
  .split('\n')
  .filter((s) => s !== '');

styleFiles.forEach((styleFile) => {
  const component = styleFile.split('packages/bpk-stylesheets/')[1];
  execSync(`cp ${styleFile} dist/bpk-stylesheets/${component}`);
})

// eslint-disable-next-line no-console
console.log('bpk-stylesheets copied.  👍');

// eslint-disable-next-line no-console
console.log('Copying bpk-component-layout styled-system...');

if (!fs.existsSync('dist/bpk-component-layout/src/styled-system')) {
  // Ensure the parent directory exists
  execSync(`mkdir -p dist/bpk-component-layout/src`);
  // Copy the entire styled-system directory
  execSync(`cp -r packages/bpk-component-layout/src/styled-system dist/bpk-component-layout/src/styled-system`);
}

// eslint-disable-next-line no-console
console.log('bpk-component-layout styled-system copied.  👍');

