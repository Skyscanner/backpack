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

// The source-time package.json declares exports with `./src/...` paths and
// `.ts`/`.tsx` extensions because that is the layout consumers see when the
// repo is linked directly. The published package is built from
// packages/backpack-web/dist, so the manifest copied into dist/ must point at
// compiled `.js` files at the dist root, not at TypeScript sources under src/.

const distPackageJsonPath = path.join(
  'packages',
  'backpack-web',
  'dist',
  'package.json',
);

const pkg = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf8'));

const rewriteTarget = (target) =>
  target.replace(/^\.\/src\//, './').replace(/\.tsx?$/, '.js');

const rewrittenExports = {};
for (const [subpath, target] of Object.entries(pkg.exports)) {
  rewrittenExports[subpath] =
    typeof target === 'string' ? rewriteTarget(target) : target;
}

// Deep imports for individual icons (e.g. bpk-component-icon/sm/flight). The
// existing wildcard `./*` would otherwise resolve these to non-existent
// `*/index.js` paths.
rewrittenExports['./bpk-component-icon/*'] = './bpk-component-icon/*.js';

// bpk-stylesheets is shipped with `.css` and `.scss` files alongside the
// compiled `.js` bundles. The base `./bpk-stylesheets/*` pattern only maps to
// `*.js`, so explicit patterns are required for the other extensions. Node
// picks the pattern with the longest matching suffix, so `*.css` wins over
// `*` for `.css` requests.
rewrittenExports['./bpk-stylesheets/*.css'] = './bpk-stylesheets/*.css';
rewrittenExports['./bpk-stylesheets/*.scss'] = './bpk-stylesheets/*.scss';

pkg.exports = rewrittenExports;

fs.writeFileSync(
  distPackageJsonPath,
  `${JSON.stringify(pkg, null, 2)}\n`,
  'utf8',
);

// eslint-disable-next-line no-console
console.log('Rewrote dist/package.json exports for the published layout. 👍');
