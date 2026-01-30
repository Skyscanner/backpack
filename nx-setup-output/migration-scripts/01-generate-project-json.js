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
 * 01-generate-project-json.js
 *
 * Generates project.json files for all packages based on analysis.json.
 * Handles special cases: sass-only, js-only, code-gen, custom-build
 *
 * Usage:
 *   node 01-generate-project-json.js [--dry-run]
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
 * Determine project tags based on package metadata
 */
function getProjectTags(pkg) {
  const tags = ['scope:backpack'];

  // Add category tag
  if (pkg.category) {
    tags.push(`type:${pkg.category}`);
  }

  // Add special case tags
  if (pkg.specialCase === 'code-gen') {
    tags.push('type:code-gen');
  }
  if (pkg.specialCase === 'sass-only') {
    tags.push('type:sass-only');
  }
  if (pkg.specialCase === 'js-only') {
    tags.push('type:js-only');
  }
  if (pkg.specialCase === 'custom-build') {
    tags.push('type:custom-build');
  }

  return tags;
}

/**
 * Generate project.json content for a package
 */
function generateProjectJson(pkg) {
  const projectJson = {
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    name: pkg.name,
    projectType: 'library',
    sourceRoot: pkg.hasSrc
      ? `${pkg.path}/src`
      : pkg.path,
    tags: getProjectTags(pkg),
  };

  // Add custom targets for special cases
  if (pkg.specialCase === 'custom-build') {
    projectJson.targets = {
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'npm run build',
          cwd: pkg.path,
        },
        cache: true,
        inputs: ['production', '^production'],
        outputs: ['{projectRoot}/dist'],
      },
    };
  }

  return projectJson;
}

/**
 * Check if a project.json file needs to be updated
 */
function needsUpdate(existingContent, newContent) {
  try {
    const existing = JSON.parse(existingContent);
    const newJson = JSON.parse(JSON.stringify(newContent));

    // Compare relevant fields
    return (
      existing.name !== newJson.name ||
      existing.projectType !== newJson.projectType ||
      existing.sourceRoot !== newJson.sourceRoot ||
      JSON.stringify(existing.tags?.sort()) !== JSON.stringify(newJson.tags?.sort()) ||
      JSON.stringify(existing.targets) !== JSON.stringify(newJson.targets)
    );
  } catch (e) {
    return true;
  }
}

/**
 * Main execution
 */
function main() {
  log('\n=== Nx Project.json Generator ===\n', 'blue');

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

  for (const pkg of analysis.packages) {
    const projectJsonPath = path.join(REPO_ROOT, pkg.path, 'project.json');
    const projectJson = generateProjectJson(pkg);
    const content = JSON.stringify(projectJson, null, 2) + '\n';

    // Check if file exists
    if (fs.existsSync(projectJsonPath)) {
      const existingContent = fs.readFileSync(projectJsonPath, 'utf-8');

      if (needsUpdate(existingContent, projectJson)) {
        if (!DRY_RUN) {
          fs.writeFileSync(projectJsonPath, content);
        }
        logAction('Updated', projectJsonPath, DRY_RUN);
        updated++;
      } else {
        log(`Skipped (no changes): ${projectJsonPath}`, 'dim');
        skipped++;
      }
    } else {
      // Create new file
      if (!DRY_RUN) {
        // Ensure directory exists
        const dir = path.dirname(projectJsonPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(projectJsonPath, content);
      }
      logAction('Created', projectJsonPath, DRY_RUN);
      created++;
    }
  }

  // Summary
  log('\n=== Summary ===', 'blue');
  log(`Created: ${created}`, 'green');
  log(`Updated: ${updated}`, 'yellow');
  log(`Skipped: ${skipped}`, 'dim');
  log(`Total:   ${analysis.packages.length}\n`);

  if (DRY_RUN) {
    log('Run without --dry-run to apply changes\n', 'yellow');
  }
}

main();
