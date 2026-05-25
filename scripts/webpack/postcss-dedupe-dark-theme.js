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

const DARK_FILENAME = 'theme-backpack-dark.css';
const LIGHT_FILENAME = 'theme-backpack-light.css';
const DARK_SELECTOR = ':root[data-theme="dark"]';

// Parse the `:root { … }` block of a Style Dictionary-emitted theme CSS file
// into a Map<propName, value>. SD output is stable (one decl per line, single
// selector block), so a regex-grade parse is sufficient.
function parseRootDecls(text) {
  const decls = new Map();
  const block = text.match(/:root\s*\{([\s\S]*?)\}/);
  if (!block) return decls;
  for (const stmt of block[1].split(';')) {
    const m = stmt.match(/^\s*(--[a-z0-9-]+)\s*:\s*([\s\S]+?)\s*$/i);
    if (m) decls.set(m[1], m[2].trim());
  }
  return decls;
}

// PostCSS plugin: when bundling theme-backpack-dark.css, drop declarations
// inside `:root[data-theme="dark"]` whose values match the sibling
// theme-backpack-light.css `:root` block. Tokens not redeclared inherit
// through the CSS cascade, so visual behaviour is unchanged while the
// bundled `base.css` drops several KB of duplicate declarations.
//
// Triggered by filename only — the published standalone
// `theme-backpack-dark.css` (copied into the package without webpack) stays
// complete, so consumers importing the dark theme directly still receive
// every token.
const plugin = () => ({
  postcssPlugin: 'bpk-dedupe-dark-theme',
  Once(root, { result }) {
    const {from} = result.opts;
    if (!from || path.basename(from) !== DARK_FILENAME) return;

    const lightPath = path.join(path.dirname(from), LIGHT_FILENAME);
    let lightSource;
    try {
      lightSource = fs.readFileSync(lightPath, 'utf8');
    } catch {
      // No sibling light file — nothing to dedup against; leave dark intact.
      return;
    }

    // Invalidate the webpack cache for base.css when light changes.
    result.messages.push({
      type: 'dependency',
      plugin: 'bpk-dedupe-dark-theme',
      file: lightPath,
      parent: from,
    });

    const lightDecls = parseRootDecls(lightSource);
    if (lightDecls.size === 0) return;

    root.walkRules(DARK_SELECTOR, (rule) => {
      rule.walkDecls((decl) => {
        if (lightDecls.get(decl.prop) === decl.value.trim()) {
          decl.remove();
        }
      });
    });
  },
});
plugin.postcss = true;

module.exports = plugin;
module.exports.parseRootDecls = parseRootDecls;
