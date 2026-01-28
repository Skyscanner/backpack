#!/usr/bin/env node

/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2024 Skyscanner Ltd
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

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../../packages');

// Special cases that need custom handling
const SPECIAL_CASES = {
  'bpk-stylesheets': {
    reason: 'Custom build script',
    buildCommand: 'node build'
  },
  'bpk-mixins': {
    reason: 'Sass-only package, no TypeScript compilation',
    buildCommand: null // May not need build target
  }
};

// Files/directories to skip (not packages)
const SKIP_LIST = [
  'node_modules',
  'package.json',
  'package-lock.json',
  'README.md',
  'react-version-test.js'
];

function generateProjectJson(packageName) {
  // Handle special cases
  if (SPECIAL_CASES[packageName]) {
    const special = SPECIAL_CASES[packageName];
    // eslint-disable-next-line no-console
    console.log(`⚠️  Special case: ${packageName} - ${special.reason}`);

    if (special.buildCommand) {
      return {
        name: packageName,
        $schema: '../../node_modules/nx/schemas/project-schema.json',
        sourceRoot: `packages/${packageName}/src`,
        projectType: 'library',
        targets: {
          build: {
            executor: 'nx:run-commands',
            options: {
              command: special.buildCommand,
              cwd: `packages/${packageName}`
            },
            outputs: [`{projectRoot}/dist`]
          }
        },
        tags: ['type:package', 'scope:backpack', 'special-case']
      };
    } 
      // bpk-mixins - Sass only, minimal build target
      return {
        name: packageName,
        $schema: '../../node_modules/nx/schemas/project-schema.json',
        sourceRoot: `packages/${packageName}`,
        projectType: 'library',
        targets: {},
        tags: ['type:package', 'scope:backpack', 'sass-only', 'special-case']
      };
    
  }

  // Standard package configuration
  return {
    name: packageName,
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    sourceRoot: `packages/${packageName}/src`,
    projectType: 'library',
    targets: {
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'babel src --out-dir dist --extensions ".ts,.tsx,.js,.jsx" --config-file ../../babel.config.js',
          cwd: `packages/${packageName}`
        },
        outputs: [`{projectRoot}/dist`]
      }
    },
    tags: ['type:package', 'scope:backpack']
  };
}

function main() {
  // eslint-disable-next-line no-console
  console.log('🚀 Generating project.json files for all Backpack packages\n');

  // Read packages directory
  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });

  let generated = 0;
  let skipped = 0;
  let specialCases = 0;

  entries.forEach(entry => {
    const {name} = entry;

    // Skip non-directories and items in skip list
    if (!entry.isDirectory() || SKIP_LIST.includes(name)) {
      // eslint-disable-next-line no-console
      console.log(`⏭️  Skipping: ${name}`);
      skipped += 1;
      return;
    }

    // Check if already has project.json
    const projectJsonPath = path.join(packagesDir, name, 'project.json');
    const exists = fs.existsSync(projectJsonPath);

    if (exists) {
      // eslint-disable-next-line no-console
      console.log(`✓  Already exists: ${name}`);
      return;
    }

    // Generate project.json
    const projectJson = generateProjectJson(name);

    // Write to file
    fs.writeFileSync(
      projectJsonPath,
      `${JSON.stringify(projectJson, null, 2)  }\n`
    );

    if (SPECIAL_CASES[name]) {
      // eslint-disable-next-line no-console
      console.log(`✅ Generated (special): ${name}`);
      specialCases += 1;
    } else {
      // eslint-disable-next-line no-console
      console.log(`✅ Generated: ${name}`);
    }
    generated += 1;
  });

  // eslint-disable-next-line no-console
  console.log('\n📊 Summary:');
  // eslint-disable-next-line no-console
  console.log(`   Generated: ${generated}`);
  // eslint-disable-next-line no-console
  console.log(`   Special cases: ${specialCases}`);
  // eslint-disable-next-line no-console
  console.log(`   Skipped: ${skipped}`);
  // eslint-disable-next-line no-console
  console.log(`   Total packages: ${generated}`);
  // eslint-disable-next-line no-console
  console.log('\n✨ Done! All project.json files generated.\n');
}

main();
