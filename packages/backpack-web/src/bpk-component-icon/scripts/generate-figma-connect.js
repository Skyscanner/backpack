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
 * Generates Figma Code Connect mappings for Backpack icons.
 *
 * This script fetches component metadata from the Figma Icons file and
 * cross-references it with the icon files in sm/ and lg/ to produce
 * a .figma.batch.ts template and .figma.batch.json file that map every icon
 * to its Figma component.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<token> node packages/backpack-web/src/bpk-component-icon/scripts/generate-figma-connect.js
 *
 * The generated file is written to:
 *   packages/backpack-web/src/bpk-component-icon/BpkIcon.figma.batch.ts
 *   packages/backpack-web/src/bpk-component-icon/BpkIcon.figma.batch.json
 */

const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = 'I9hynSlX2wyrlhceZr7z1u';
const FIGMA_FILE_NAME = 'Backpack-Icons';
const FIGMA_BASE_URL = `https://www.figma.com/design/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}`;

const ICON_PKG = path.resolve(__dirname, '..');
const TEMPLATE_FILE = path.join(ICON_PKG, 'BpkIcon.figma.batch.ts');
const BATCH_FILE = path.join(ICON_PKG, 'BpkIcon.figma.batch.json');
const LEGACY_OUTPUT_FILE = path.join(ICON_PKG, 'BpkIcon.figma.tsx');
const PACKAGE_IMPORT_PATH = '@skyscanner/backpack-web/bpk-component-icon';

function kebabToPascal(str) {
  return str
    .split(/[-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getIconFiles(dir) {
  if (!fs.existsSync(dir)) return new Set();
  return new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.jsx'))
      .map((f) => f.replace('.jsx', '')),
  );
}

async function fetchFigmaComponents() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error(
      'Error: FIGMA_ACCESS_TOKEN environment variable is required.',
    );
    process.exit(1);
  }

  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/components`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });

  if (!res.ok) {
    console.error(`Figma API error: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();
  return data.meta.components;
}

function groupComponentSets(components) {
  const sets = {};
  for (const c of components) {
    const {name} = c.containing_frame;
    const setNodeId = c.containing_frame.nodeId;

    if (!sets[name]) {
      sets[name] = { nodeId: setNodeId, variants: {}, variantProp: null };
    }

    // Detect the variant property name (most use "Size", one uses "Property 1")
    const match = c.name.match(/^(.+?)=(\d+)$/);
    if (match) {
      const [, variantProp, variantValue] = match;
      sets[name].variantProp = variantProp;
      sets[name].variants[variantValue] = c.node_id;
    }
  }
  return sets;
}

function figmaUrl(nodeId) {
  const encoded = nodeId.replace(/:/g, '%3A');
  return `${FIGMA_BASE_URL}?node-id=${encoded}`;
}

// Spelling aliases: Figma name → code name
const SPELLING_ALIASES = {
  centre: 'center',
};

/**
 * Normalize a name by collapsing double-hyphens to single and applying
 * spelling aliases, so we can fuzzy-match Figma names to code file names.
 *
 * @param {string} name - The icon name to normalize.
 * @returns {string} The normalized name.
 */
function normalize(name) {
  const collapsed = name.replace(/--/g, '-');
  return collapsed
    .split('-')
    .map((part) => SPELLING_ALIASES[part] || part)
    .join('-');
}

/**
 * Find the matching code file name for a Figma icon name.
 * Tries exact match first, then falls back to normalized matching.
 *
 * @param {string} figmaName - The icon name from Figma.
 * @param {Set<string>} codeIcons - Set of icon file names from code.
 * @returns {string|null} The matching code file name, or null if not found.
 */
function findCodeMatch(figmaName, codeIcons) {
  if (codeIcons.has(figmaName)) return figmaName;

  const normalizedFigma = normalize(figmaName);
  for (const codeName of codeIcons) {
    if (normalize(codeName) === normalizedFigma) return codeName;
  }
  return null;
}

function createBatchEntry(entry, size) {
  const isSmall = size === '16';
  const folder = isSmall ? 'sm' : 'lg';
  const file = isSmall ? entry.smFile : entry.lgFile;
  const sizeName = isSmall ? 'Small' : 'Large';
  const componentName = `Bpk${sizeName}${kebabToPascal(file)}Icon`;

  return {
    url: figmaUrl(entry.nodeId),
    component: componentName,
    source: `./${folder}/${file}.jsx`,
    id: componentName,
    name: componentName,
    importPath: `${PACKAGE_IMPORT_PATH}/${folder}/${file}`,
    variantProp: entry.variantProp,
    variantValue: size,
  };
}

function generateFiles(iconSets, smIcons, lgIcons) {
  const entries = [];

  for (const [name, set] of Object.entries(iconSets).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const smMatch = set.variants['16'] ? findCodeMatch(name, smIcons) : null;
    const lgMatch = set.variants['24'] ? findCodeMatch(name, lgIcons) : null;

    if (smMatch || lgMatch) {
      entries.push({
        name: smMatch || lgMatch,
        figmaName: name,
        nodeId: set.nodeId,
        smFile: smMatch,
        lgFile: lgMatch,
        variantProp: set.variantProp || 'Size',
      });
    }
  }

  if (entries.length === 0) {
    console.error('No matching icons found between Figma and code.');
    process.exit(1);
  }

  const components = [];
  for (const e of entries) {
    if (e.lgFile) components.push(createBatchEntry(e, '24'));
    if (e.smFile) components.push(createBatchEntry(e, '16'));
  }

  components.sort((a, b) => a.importPath.localeCompare(b.importPath));

  const templateContent = `/*
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

// AUTO-GENERATED by scripts/generate-figma-connect.js - do not edit manually.

// eslint-disable-next-line import/no-unresolved
import figma from 'figma'

const example = figma.code\`
  <\${figma.batch.name} />
\`

export default {
  id: figma.batch.id,
  variant: { [figma.batch.variantProp]: figma.batch.variantValue },
  example,
  imports: [
    \`import \${figma.batch.name} from '\${figma.batch.importPath}';\`,
  ],
}
`;

  const batchContent = `${JSON.stringify(
    {
      templateFile: './BpkIcon.figma.batch.ts',
      components,
    },
    null,
    2,
  )}\n`;

  return { templateContent, batchContent, count: components.length };
}

async function main() {
  console.log('Fetching icon components from Figma...');
  const components = await fetchFigmaComponents();
  console.log(`Found ${components.length} components in Figma.`);

  const iconSets = groupComponentSets(components);
  console.log(`Grouped into ${Object.keys(iconSets).length} icon sets.`);

  const smIcons = getIconFiles(path.join(ICON_PKG, 'sm'));
  const lgIcons = getIconFiles(path.join(ICON_PKG, 'lg'));
  console.log(`Code icons: ${smIcons.size} sm, ${lgIcons.size} lg.`);

  const { batchContent, count, templateContent } = generateFiles(
    iconSets,
    smIcons,
    lgIcons,
  );

  fs.writeFileSync(TEMPLATE_FILE, templateContent);
  fs.writeFileSync(BATCH_FILE, batchContent);
  if (fs.existsSync(LEGACY_OUTPUT_FILE)) {
    fs.unlinkSync(LEGACY_OUTPUT_FILE);
  }
  console.log(
    `Generated ${TEMPLATE_FILE} and ${BATCH_FILE} with ${count} icon mappings.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
