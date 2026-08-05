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
 * Generates a Figma Code Connect batch JSON file for Backpack icons.
 *
 * This script fetches component metadata from the Figma Icons file and
 * cross-references it with the icon files in sm/ and lg/ to produce
 * BpkIcon.figma.batch.json, which pairs with BpkIcon.figma.batch.ts.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<token> node packages/backpack-web/src/bpk-component-icon/scripts/generate-figma-connect.js
 *
 * The generated file is written to:
 *   packages/backpack-web/src/bpk-component-icon/BpkIcon.figma.batch.json
 */

const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = 'I9hynSlX2wyrlhceZr7z1u';
const FIGMA_FILE_NAME = 'Backpack-Icons';
const FIGMA_BASE_URL = `https://www.figma.com/design/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}`;

const ICON_PKG = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ICON_PKG, 'BpkIcon.figma.batch.json');

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
 * Normalises a kebab-case icon name for fuzzy matching.
 * Collapses double-hyphens and applies SPELLING_ALIASES so that
 * Figma names like "centre" match the code name "center".
 * @param {string} name - kebab-case icon name to normalise
 * @returns {string} normalised name
 */
function normalize(name) {
  const collapsed = name.replace(/--/g, '-');
  return collapsed
    .split('-')
    .map((part) => SPELLING_ALIASES[part] || part)
    .join('-');
}

/**
 * Returns the code icon name that corresponds to a Figma component name,
 * or null if no match exists. First tries an exact match, then falls back
 * to normalised comparison so spelling aliases (e.g. centre/center) resolve.
 * @param {string} figmaName - icon name from Figma
 * @param {Set<string>} codeIcons - set of icon names from the codebase
 * @returns {string|null} matching code name, or null
 */
function findCodeMatch(figmaName, codeIcons) {
  if (codeIcons.has(figmaName)) return figmaName;

  const normalizedFigma = normalize(figmaName);
  for (const codeName of codeIcons) {
    if (normalize(codeName) === normalizedFigma) return codeName;
  }
  return null;
}

function generateBatchJson(iconSets, smIcons, lgIcons) {
  const components = [];

  for (const [name, set] of Object.entries(iconSets).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const smMatch = set.variants['16'] ? findCodeMatch(name, smIcons) : null;
    const lgMatch = set.variants['24'] ? findCodeMatch(name, lgIcons) : null;

    if (smMatch || lgMatch) {
      const url = figmaUrl(set.nodeId);
      const variantProp = set.variantProp || 'Size';

      if (smMatch) {
        const pascal = kebabToPascal(smMatch);
        components.push({
          url,
          id: `bpk-icon-sm-${name}`,
          componentName: `BpkSmall${pascal}Icon`,
          importPath: `@skyscanner-internal/backpack-web/bpk-component-icon/sm/${smMatch}`,
          variantProp,
          sizeVariant: '16',
        });
      }

      if (lgMatch) {
        const pascal = kebabToPascal(lgMatch);
        components.push({
          url,
          id: `bpk-icon-lg-${name}`,
          componentName: `BpkLarge${pascal}Icon`,
          importPath: `@skyscanner-internal/backpack-web/bpk-component-icon/lg/${lgMatch}`,
          variantProp,
          sizeVariant: '24',
        });
      }
    }
  }

  if (components.length === 0) {
    console.error('No matching icons found between Figma and code.');
    process.exit(1);
  }

  return {
    templateFile: './BpkIcon.figma.batch.ts',
    components,
  };
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

  const batch = generateBatchJson(iconSets, smIcons, lgIcons);

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(batch, null, 2)  }\n`);
  console.log(`Generated ${OUTPUT_FILE} with ${batch.components.length} icon entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
