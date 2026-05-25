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

const fs = require('node:fs');
const path = require('node:path');

// Matches `var(--bpk-…)` references inside a declaration value, capturing the
// custom-property name. Stops at the first `,` (var() fallback separator) or
// `)` (end of var() call). The manifest is keyed on the property name only.
const VAR_REF_PATTERN = /var\(\s*(--bpk-[a-z0-9-]+)/gi;

// Reads `tokens-mangle-map.json` produced by token-sync and returns the
// `original → mangled` lookup table. Cached per-path so the file isn't read
// once per processed CSS file in a single webpack run.
const manifestCache = new Map();
function loadManifest(manifestPath) {
  const cached = manifestCache.get(manifestPath);
  if (cached) {
    return cached;
  }
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const parsed = JSON.parse(raw);
  manifestCache.set(manifestPath, parsed);
  return parsed;
}

// PostCSS plugin: rewrites every `--bpk-original` it sees — both as a custom
// property declaration name (`--bpk-canvas-default: #fff`) and as a
// `var(--bpk-original)` reference — to its mangled form, driven by the
// manifest emitted by token-sync. Token-sync's standalone CSS files keep
// their readable long names; this plugin is the only place mangling happens,
// so consumers of the published `theme-backpack-*.css` files (or anyone who
// wants to opt out of the mangler) are unaffected.
//
// Options:
//   manifestPath (string, required) — absolute path to
//     `tokens-mangle-map.json`. Throws at plugin construction time if the
//     file is missing or unparseable.
//   strict (boolean, default false) — when true, throws if a `var(--bpk-…)`
//     reference does not appear in the manifest. Useful in CI to surface
//     typos and tokens that haven't been promoted into the design system.
//     Off by default so legacy `var(--bpk-…)` calls (component-local custom
//     properties like `--bpk-button-svg-display`) keep flowing through.
const plugin = (opts = {}) => {
  const { manifestPath, strict = false } = opts;
  if (!manifestPath) {
    throw new Error(
      'postcss-mangle-bpk-vars: option `manifestPath` is required.',
    );
  }
  if (!path.isAbsolute(manifestPath)) {
    throw new Error(
      `postcss-mangle-bpk-vars: \`manifestPath\` must be absolute, got "${manifestPath}".`,
    );
  }

  // Load eagerly so a missing/broken manifest fails fast at webpack startup
  // rather than mid-build.
  const manifest = loadManifest(manifestPath);

  return {
    postcssPlugin: 'bpk-mangle-vars',
    Declaration(decl) {
      // 1) LHS: rewrite custom property declarations whose name is in the
      //    manifest. Catches the `:root { … }` blocks shipped by token-sync's
      //    `theme-backpack-*.css` files when they flow through webpack.
      if (decl.prop.startsWith('--bpk-')) {
        const mappedProp = manifest[decl.prop];
        if (mappedProp !== undefined && mappedProp !== decl.prop) {
          // eslint-disable-next-line no-param-reassign
          decl.prop = mappedProp;
        }
      }

      // 2) RHS: rewrite `var(--bpk-…)` references inside the value. Catches
      //    component code that calls into the design system tokens.
      if (decl.value && decl.value.includes('var(--bpk-')) {
        // eslint-disable-next-line no-param-reassign
        decl.value = decl.value.replace(VAR_REF_PATTERN, (match, name) => {
          const mangled = manifest[name];
          if (mangled === undefined) {
            if (strict) {
              throw decl.error(
                `Reference to unknown CSS variable "${name}". Either token-sync ` +
                  `has not emitted this token (re-run \`npm run tokens:sync\`) or the ` +
                  `name is a typo. Manifest: ${manifestPath}`,
                { word: name },
              );
            }
            return match;
          }
          if (mangled === name) {
            // Identity entry — nothing to do, return original match unchanged.
            return match;
          }
          return match.replace(name, mangled);
        });
      }
    },
  };
};
plugin.postcss = true;

module.exports = plugin;
// Exported for unit tests.
module.exports.VAR_REF_PATTERN = VAR_REF_PATTERN;
module.exports.loadManifest = loadManifest;
