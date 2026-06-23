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

const fs = require('fs');
const path = require('path');

const { globSync } = require('glob');

// eslint-disable-next-line no-console
console.log('Copying CSS files...');

// Glob in Node rather than shelling out: an empty result is unambiguously an
// empty array, while a genuine I/O error throws — neither is conflated with a
// pipeline exit code (the old `find | grep` exited 1 on zero matches and
// crashed the build).
const cssFiles = globSync('packages/backpack-web/src/**/*.css', {
  ignore: [
    '**/node_modules/**',
    'packages/backpack-web/src/bpk-stylesheets/**',
  ],
});

cssFiles.forEach((cssFile) => {
  const destDir = path.dirname(cssFile).replace(/^packages\/backpack-web\/src\//, 'packages/backpack-web/dist/');
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(cssFile, path.join(destDir, path.basename(cssFile)));
});

// eslint-disable-next-line no-console
console.log('CSS files copied.  👍');
