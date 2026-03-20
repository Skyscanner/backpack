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
 * a single .figma.tsx file that maps every icon to its Figma component.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<token> node scripts/generate-figma-connect.js
 *
 * The generated file is written to:
 *   packages/bpk-component-icon/BpkIcon.figma.tsx
 */

const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = 'I9hynSlX2wyrlhceZr7z1u';
const FIGMA_FILE_NAME = 'Backpack-Icons';
const FIGMA_BASE_URL = `https://www.figma.com/design/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}`;

const ICON_PKG = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ICON_PKG, 'BpkIcon.figma.tsx');

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
  const encoded = nodeId.replace(':', '%3A');
  return `${FIGMA_BASE_URL}?node-id=${encoded}`;
}

function generateFile(iconSets, smIcons, lgIcons) {
  const entries = [];

  for (const [name, set] of Object.entries(iconSets).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const hasSm = smIcons.has(name) && set.variants['16'];
    const hasLg = lgIcons.has(name) && set.variants['24'];

    if (hasSm || hasLg) {
      entries.push({ name, nodeId: set.nodeId, hasSm, hasLg, variantProp: set.variantProp || 'Size' });
    }
  }

  if (entries.length === 0) {
    console.error('No matching icons found between Figma and code.');
    process.exit(1);
  }

  // Build imports — interleaved and sorted alphabetically by import path
  // to satisfy eslint import/order rules
  const allImports = [];
  for (const e of entries) {
    const pascal = kebabToPascal(e.name);
    if (e.hasLg) {
      allImports.push(
        `import Lg${pascal}Icon from './lg/${e.name}';`,
      );
    }
    if (e.hasSm) {
      allImports.push(
        `import Sm${pascal}Icon from './sm/${e.name}';`,
      );
    }
  }
  allImports.sort((a, b) => {
    const pathA = a.match(/from '(.+)'/)[1];
    const pathB = b.match(/from '(.+)'/)[1];
    return pathA.localeCompare(pathB);
  });

  // Build connect calls
  const connectCalls = [];
  for (const e of entries) {
    const pascal = kebabToPascal(e.name);
    const url = figmaUrl(e.nodeId);

    if (e.hasSm && e.hasLg) {
      // Both sizes exist — connect to component set with variant mapping
      const prop = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e.variantProp)
        ? e.variantProp
        : JSON.stringify(e.variantProp);
      connectCalls.push(`figma.connect(
  Sm${pascal}Icon,
  "${url}",
  {
    variant: { ${prop}: "16" },
    example: () => <Sm${pascal}Icon />,
  },
)

figma.connect(
  Lg${pascal}Icon,
  "${url}",
  {
    variant: { ${prop}: "24" },
    example: () => <Lg${pascal}Icon />,
  },
)`);
    } else if (e.hasSm) {
      connectCalls.push(`figma.connect(
  Sm${pascal}Icon,
  "${url}",
  {
    example: () => <Sm${pascal}Icon />,
  },
)`);
    } else if (e.hasLg) {
      connectCalls.push(`figma.connect(
  Lg${pascal}Icon,
  "${url}",
  {
    example: () => <Lg${pascal}Icon />,
  },
)`);
    }
  }

  const content = `/*
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

// AUTO-GENERATED by scripts/generate-figma-connect.js — do not edit manually.

import figma from '@figma/code-connect'

${allImports.join('\n')}

${connectCalls.join('\n\n')}
`;

  return { content, count: entries.length };
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

  const { content, count } = generateFile(iconSets, smIcons, lgIcons);

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(
    `Generated ${OUTPUT_FILE} with ${count} icon mappings.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
