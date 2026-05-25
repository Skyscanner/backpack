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

const path = require('node:path');

const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');

const dedupeDarkTheme = require('./postcss-dedupe-dark-theme');
const mangleBpkVars = require('./postcss-mangle-bpk-vars');

// Manifest emitted by token-sync's `npm run tokens:build-css` step. Resolved
// from the repo root so the path stays stable regardless of which package's
// webpack config invokes this plugin chain.
const TOKENS_MANGLE_MAP_PATH = path.resolve(
  __dirname,
  '../../token-sync/css/tokens-mangle-map.json',
);

module.exports = () => [
  // Dedupe runs first. It loads the sibling `theme-backpack-light.css` from
  // disk (long readable names, since token-sync ships the unmangled form)
  // and compares against the dark theme AST — so this step must happen
  // before the mangler rewrites any names.
  dedupeDarkTheme(),
  // Mangle runs after dedupe. Rewrites both custom property declarations
  // (LHS) and `var(--bpk-…)` references (RHS) to their short forms, so the
  // bundled output ships the mangled names while the source files (component
  // SCSS, token-sync CSS) stay readable.
  mangleBpkVars({ manifestPath: TOKENS_MANGLE_MAP_PATH }),
  postCssFlexbugsFixes,
  autoprefixer({ flexbox: 'no-2009' }),
];
