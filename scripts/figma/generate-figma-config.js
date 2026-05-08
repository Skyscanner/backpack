#!/usr/bin/env node

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

/**
 * Generates figma.config.json with importPaths for all component packages
 * that have .figma.tsx files.
 *
 * Usage:
 *   node scripts/figma/generate-figma-config.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const CONFIG_FILE = path.join(ROOT, 'figma.config.json');
const PACKAGES_DIR = path.join(ROOT, 'packages');

function findFigmaFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      results.push(...findFigmaFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.figma.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const figmaFiles = findFigmaFiles(PACKAGES_DIR);

const pkgs = new Set();
for (const f of figmaFiles) {
  const rel = path.relative(PACKAGES_DIR, f);
  const match = rel.match(/^(bpk-component-[^/]+)\//);
  if (match) {
    pkgs.add(match[1]);
  }
}

const importPaths = {};

// Icon paths — preserve filename with trailing *
importPaths['bpk-component-icon/sm/*'] =
  '@skyscanner/backpack-web/bpk-component-icon/sm/*';
importPaths['bpk-component-icon/lg/*'] =
  '@skyscanner/backpack-web/bpk-component-icon/lg/*';

// Component paths — map src/* to the package root
for (const pkg of [...pkgs].sort()) {
  if (pkg === 'bpk-component-icon') {
    // Icons are handled separately above
    // eslint-disable-next-line no-continue
    continue;
  }
  importPaths[`${pkg}/src/*`] = `@skyscanner/backpack-web/${pkg}`;
}

const config = {
  codeConnect: {
    include: ['/**/*.{tsx,jsx}'],
    label: 'React',
    importPaths,
    interactiveSetupFigmaFileUrl:
      'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=100-1682&p=f&t=dyMLItX3JduHpAEJ-0',
  },
};

fs.writeFileSync(CONFIG_FILE, `${JSON.stringify(config, null, 2)}\n`);
// eslint-disable-next-line no-console
console.log(
  `Generated ${CONFIG_FILE} with ${Object.keys(importPaths).length} import path mappings.`,
);
