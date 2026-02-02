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

// eslint-disable-next-line no-console
console.log('Copying CSS files...');

const cssFiles = execSync(
  'find packages -name "*.css" | grep -v node_modules | grep -v "bpk-stylesheets"',
)
  .toString()
  .split('\n')
  .filter((s) => s !== '');

// eslint-disable-next-line array-callback-return
cssFiles.map((cssFile) => {
  let component;
  const paths = cssFile.split('packages/');
  const componentPath = paths[1].split('/');

  // V2 components are nested inside a folder
  if (paths[1].match(/\/Bpk.*\//) || paths[1].match(/__generated__/)) {
    component = `${componentPath[0]}/${componentPath[1]}/${componentPath[2]}`;
  } else {
    component = `${componentPath[0]}/${componentPath[1]}`;
  }
  execSync(`cp ${cssFile} dist/${component}`);
});

// eslint-disable-next-line no-console
console.log('CSS files copied.  👍');
