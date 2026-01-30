#!/usr/bin/env node
/*
 * Copyright 2024 Skyscanner
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
 * 02-generate-tsconfigs.js
 *
 * Generates tsconfig.json files for all TypeScript packages based on analysis.json.
 * Handles special cases: sass-only (skip), js-only (skip), code-gen, custom-build
 *
 * Usage:
 *   node 02-generate-tsconfigs.js [--dry-run]
 *
 * Options:
 *   --dry-run    Preview changes without writing files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REPO_ROOT = path.resolve(__dirname, '../..');
const ANALYSIS_PATH = path.resolve(__dirname, '../analysis.json');
const DRY_RUN = process.argv.includes('--dry-run');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logAction(action, target, dryRun = false) {
  const prefix = dryRun ? '[DRY-RUN] ' : '';
  log(`${prefix}${action}: ${target}`, dryRun ? 'yellow' : 'green');
}

/**
 * Generate tsconfig.json content for a TypeScript package
 */
function generateTsConfig(pkg) {
  const tsconfig = {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src',
    },
    include: ['src/**/*', 'index.ts'],
    exclude: ['node_modules', 'dist'],
    references: [],
  };

  // Adjust for packages without src directory
  if (!pkg.hasSrc) {
    tsconfig.compilerOptions.rootDir = '.';
    tsconfig.include = ['**/*.ts', '**/*.tsx'];
    tsconfig.exclude = ['node_modules', 'dist', '**/*.test.ts', '**/*.test.tsx'];
  }

  return tsconfig;
}

/**
 * Check if a tsconfig.json file needs to be updated
 */
function needsUpdate(existingContent, newContent) {
  try {
    const existing = JSON.parse(existingContent);
    const newJson = JSON.parse(JSON.stringify(newContent));

    // Compare relevant fields
    return (
      existing.extends !== newJson.extends ||
      JSON.stringify(existing.compilerOptions) !== JSON.stringify(newJson.compilerOptions) ||
      JSON.stringify(existing.include?.sort()) !== JSON.stringify(newJson.include?.sort()) ||
      JSON.stringify(existing.exclude?.sort()) !== JSON.stringify(newJson.exclude?.sort())
    );
  } catch (e) {
    return true;
  }
}

/**
 * Check if package should have a tsconfig
 */
function shouldHaveTsConfig(pkg) {
  // Skip sass-only packages
  if (pkg.specialCase === 'sass-only') {
    return false;
  }

  // Skip js-only packages (they don't have TypeScript yet)
  if (pkg.specialCase === 'js-only') {
    return false;
  }

  // Only create tsconfig for packages with TypeScript
  return pkg.hasTypeScript === true;
}

/**
 * Main execution
 */
function main() {
  log('\n=== Nx TSConfig Generator ===\n', 'blue');

  if (DRY_RUN) {
    log('Running in DRY-RUN mode - no files will be modified\n', 'yellow');
  }

  // Load analysis data
  if (!fs.existsSync(ANALYSIS_PATH)) {
    log(`Error: Analysis file not found at ${ANALYSIS_PATH}`, 'red');
    process.exit(1);
  }

  const analysis = JSON.parse(fs.readFileSync(ANALYSIS_PATH, 'utf-8'));
  log(`Loaded analysis for ${analysis.packages.length} packages\n`, 'dim');

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let ignored = 0;

  for (const pkg of analysis.packages) {
    // Check if package should have tsconfig
    if (!shouldHaveTsConfig(pkg)) {
      log(`Ignored (${pkg.specialCase || 'no TypeScript'}): ${pkg.path}`, 'dim');
      ignored++;
      continue;
    }

    const tsconfigPath = path.join(REPO_ROOT, pkg.path, 'tsconfig.json');
    const tsconfig = generateTsConfig(pkg);
    const content = JSON.stringify(tsconfig, null, 2) + '\n';

    // Check if file exists
    if (fs.existsSync(tsconfigPath)) {
      const existingContent = fs.readFileSync(tsconfigPath, 'utf-8');

      if (needsUpdate(existingContent, tsconfig)) {
        if (!DRY_RUN) {
          fs.writeFileSync(tsconfigPath, content);
        }
        logAction('Updated', tsconfigPath, DRY_RUN);
        updated++;
      } else {
        log(`Skipped (no changes): ${tsconfigPath}`, 'dim');
        skipped++;
      }
    } else {
      // Create new file
      if (!DRY_RUN) {
        // Ensure directory exists
        const dir = path.dirname(tsconfigPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(tsconfigPath, content);
      }
      logAction('Created', tsconfigPath, DRY_RUN);
      created++;
    }
  }

  // Summary
  log('\n=== Summary ===', 'blue');
  log(`Created: ${created}`, 'green');
  log(`Updated: ${updated}`, 'yellow');
  log(`Skipped: ${skipped}`, 'dim');
  log(`Ignored: ${ignored} (sass-only, js-only, or no TypeScript)`, 'dim');
  log(`Total:   ${analysis.packages.length}\n`);

  if (DRY_RUN) {
    log('Run without --dry-run to apply changes\n', 'yellow');
  }
}

main();
