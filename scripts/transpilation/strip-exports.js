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

// The source-time package.json declares an `exports` map with `./src/...`
// paths so sibling workspace packages can resolve `@skyscanner/backpack-web/foo`
// against the source tree before the package is built. The published artifact
// is built from packages/backpack-web/dist and has historically relied on
// Node's legacy filesystem resolution (no `exports` field), which is what
// existing consumers expect. Strip the field from the dist manifest so the
// published package keeps that contract.

const distPackageJsonPath = path.join(
  'packages',
  'backpack-web',
  'dist',
  'package.json',
);

const pkg = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf8'));

delete pkg.exports;

fs.writeFileSync(
  distPackageJsonPath,
  `${JSON.stringify(pkg, null, 2)}\n`,
  'utf8',
);

// eslint-disable-next-line no-console
console.log('Stripped exports from dist/package.json for the published layout. 👍');
