#!/usr/bin/env node
/**
 * Updates import paths from relative imports to NX path aliases
 *
 * Usage: node scripts/nx/update-import-paths.js <component-name> <package-name>
 * Example: node scripts/nx/update-import-paths.js bpk-component-badge @backpack/badge
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentName = process.argv[2];
const packageAlias = process.argv[3];

if (!componentName || !packageAlias) {
  console.error('Usage: node update-import-paths.js <component-name> <package-name>');
  console.error('Example: node update-import-paths.js bpk-component-badge @backpack/badge');
  process.exit(1);
}

console.log(`Updating imports from 'packages/${componentName}' to '${packageAlias}'...`);

// Find all JS/TS files except node_modules and dist folders
const files = glob.sync('**/*.{js,jsx,ts,tsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/dist-*/**', '**/coverage/**', '**/scripts/nx/**'],
  absolute: true,
});

let totalReplacements = 0;
let filesUpdated = 0;

files.forEach((filePath) => {
  // Skip if it's a directory
  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;

  // Pattern to match relative imports to the component
  // Matches: '../packages/bpk-component-badge', '../../packages/bpk-component-badge', etc.
  // Also matches: '../packages/bpk-component-badge/src/Something'

  // Replace import statements
  const importRegex = new RegExp(
    `(from\\s+['"])(\\.\\./)+packages/${componentName}(/[^'"]*)?(['"])`,
    'g'
  );

  const newContent = content.replace(importRegex, (_match, prefix, _relativePath, _subPath, suffix) => {
    replacements++;
    return `${prefix}${packageAlias}${suffix}`;
  });

  // Replace require statements
  const requireRegex = new RegExp(
    `(require\\s*\\(\\s*['"])(\\.\\./)+packages/${componentName}(/[^'"]*)?(['"]\\s*\\))`,
    'g'
  );

  const finalContent = newContent.replace(requireRegex, (_match, prefix, _relativePath, _subPath, suffix) => {
    replacements++;
    return `${prefix}${packageAlias}${suffix}`;
  });

  if (replacements > 0) {
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`✓ Updated ${replacements} import(s) in: ${path.relative(process.cwd(), filePath)}`);
    filesUpdated++;
    totalReplacements += replacements;
  }
});

console.log(`\nComplete! Updated ${totalReplacements} import(s) across ${filesUpdated} file(s).`);
