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
 * 03-update-nx-json.js
 *
 * Updates nx.json with optimized configuration for the monorepo.
 * Creates a backup before making changes.
 *
 * Usage:
 *   node 03-update-nx-json.js [--dry-run]
 *
 * Options:
 *   --dry-run    Preview changes without writing files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REPO_ROOT = path.resolve(__dirname, '../..');
const NX_JSON_PATH = path.join(REPO_ROOT, 'nx.json');
const BACKUP_PATH = path.resolve(__dirname, '../nx.json.backup');
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
 * Generate the optimal nx.json configuration
 */
function generateNxJson() {
  return {
    $schema: './node_modules/nx/schemas/nx-schema.json',
    namedInputs: {
      default: ['{projectRoot}/**/*', 'sharedGlobals'],
      production: [
        'default',
        '!{projectRoot}/**/*-test.ts',
        '!{projectRoot}/**/*-test.tsx',
        '!{projectRoot}/**/*.test.ts',
        '!{projectRoot}/**/*.test.tsx',
        '!{projectRoot}/**/*.stories.tsx',
        '!{projectRoot}/**/*.figma.tsx',
        '!{projectRoot}/jest.config.js',
      ],
      sharedGlobals: ['{workspaceRoot}/tsconfig.base.json'],
    },
    targetDefaults: {
      build: {
        dependsOn: ['^build'],
        inputs: ['production', '^production'],
        outputs: ['{projectRoot}/dist'],
        cache: true,
      },
      test: {
        inputs: ['default', '^production'],
        cache: true,
      },
      lint: {
        inputs: ['default'],
        cache: true,
      },
      typecheck: {
        dependsOn: ['^typecheck'],
        inputs: ['default', '^default'],
        cache: true,
      },
    },
    plugins: [
      {
        plugin: '@nx/js/typescript',
        options: {
          typecheck: {
            targetName: 'typecheck',
          },
        },
      },
    ],
  };
}

/**
 * Deep compare two objects
 */
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Merge new config with existing config (preserving custom additions)
 */
function mergeConfig(existing, newConfig) {
  const merged = { ...existing };

  // Update schema
  merged.$schema = newConfig.$schema;

  // Merge namedInputs (keep any custom ones)
  merged.namedInputs = {
    ...existing.namedInputs,
    ...newConfig.namedInputs,
  };

  // Merge targetDefaults (keep any custom ones)
  merged.targetDefaults = {
    ...existing.targetDefaults,
    ...newConfig.targetDefaults,
  };

  // Ensure plugins are set
  merged.plugins = newConfig.plugins;

  return merged;
}

/**
 * Main execution
 */
function main() {
  log('\n=== Nx.json Updater ===\n', 'blue');

  if (DRY_RUN) {
    log('Running in DRY-RUN mode - no files will be modified\n', 'yellow');
  }

  // Check if nx.json exists
  if (!fs.existsSync(NX_JSON_PATH)) {
    log(`Error: nx.json not found at ${NX_JSON_PATH}`, 'red');
    process.exit(1);
  }

  // Read existing nx.json
  const existingContent = fs.readFileSync(NX_JSON_PATH, 'utf-8');
  let existingConfig;
  try {
    existingConfig = JSON.parse(existingContent);
  } catch (e) {
    log(`Error: Failed to parse nx.json: ${e.message}`, 'red');
    process.exit(1);
  }

  // Generate new config
  const newConfig = generateNxJson();

  // Check if update is needed
  if (deepEqual(existingConfig, newConfig)) {
    log('nx.json is already up to date - no changes needed', 'dim');
    return;
  }

  // Merge configs
  const mergedConfig = mergeConfig(existingConfig, newConfig);
  const mergedContent = JSON.stringify(mergedConfig, null, 2) + '\n';

  // Create backup
  if (!DRY_RUN) {
    // Ensure backup directory exists
    const backupDir = path.dirname(BACKUP_PATH);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.writeFileSync(BACKUP_PATH, existingContent);
    logAction('Backup created', BACKUP_PATH);
  } else {
    logAction('Would create backup', BACKUP_PATH, true);
  }

  // Write updated nx.json
  if (!DRY_RUN) {
    fs.writeFileSync(NX_JSON_PATH, mergedContent);
    logAction('Updated', NX_JSON_PATH);
  } else {
    logAction('Would update', NX_JSON_PATH, true);
  }

  // Show diff summary
  log('\n=== Changes ===', 'blue');

  const changes = [];

  // Check namedInputs changes
  if (!deepEqual(existingConfig.namedInputs, mergedConfig.namedInputs)) {
    changes.push('- namedInputs: Updated input patterns');
  }

  // Check targetDefaults changes
  if (!deepEqual(existingConfig.targetDefaults, mergedConfig.targetDefaults)) {
    changes.push('- targetDefaults: Updated target configurations');
  }

  // Check plugins changes
  if (!deepEqual(existingConfig.plugins, mergedConfig.plugins)) {
    changes.push('- plugins: Updated plugin configuration');
  }

  if (changes.length > 0) {
    changes.forEach((change) => log(change, 'yellow'));
  } else {
    log('No significant changes detected', 'dim');
  }

  log('\n=== Summary ===', 'blue');
  if (DRY_RUN) {
    log('Backup would be created at: ' + BACKUP_PATH, 'yellow');
    log('Run without --dry-run to apply changes\n', 'yellow');
  } else {
    log('Backup saved to: ' + BACKUP_PATH, 'green');
    log('nx.json has been updated successfully\n', 'green');
  }
}

main();
