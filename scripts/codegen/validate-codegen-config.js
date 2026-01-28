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

/* eslint-disable no-console */

/**
 * Code Generation Configuration Validation Script
 *
 * Validates that code generation is properly configured:
 * - All required generate targets exist
 * - Build targets correctly depend on generate targets
 * - The dependency chain is properly configured
 *
 * Usage:
 *   node scripts/codegen/validate-codegen-config.js
 */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '../../packages');

// Components that require code generation
const CODEGEN_COMPONENTS = [
  {
    name: 'bpk-component-icon',
    expectedOutputs: ['sm', 'lg', 'xxxl'],
    source: 'node_modules/@skyscanner/bpk-svgs/dist/js/icons',
  },
  {
    name: 'bpk-component-spinner',
    expectedOutputs: ['src/spinners'],
    source: 'node_modules/@skyscanner/bpk-svgs/dist/js/spinners',
  },
  {
    name: 'bpk-component-flare',
    expectedOutputs: ['src/__generated__'],
    source: 'src/svgs',
  },
];

let hasErrors = false;

/**
 * Log an error message.
 *
 * @param {string} message - Error message.
 * @returns {void}
 */
function logError(message) {
  console.error(`ERROR: ${message}`);
  hasErrors = true;
}

/**
 * Log a warning message.
 *
 * @param {string} message - Warning message.
 * @returns {void}
 */
function logWarning(message) {
  console.warn(`WARNING: ${message}`);
}

/**
 * Log a success message.
 *
 * @param {string} message - Success message.
 * @returns {void}
 */
function logSuccess(message) {
  console.log(`OK: ${message}`);
}

/**
 * Validate a single component's project.json.
 *
 * @param {Object} component - Component configuration.
 * @returns {void}
 */
function validateComponent(component) {
  const projectJsonPath = path.join(
    PACKAGES_DIR,
    component.name,
    'project.json',
  );

  console.log(`\nValidating ${component.name}...`);

  if (!fs.existsSync(projectJsonPath)) {
    logError(`${component.name}/project.json not found`);
    return;
  }

  let projectConfig;
  try {
    projectConfig = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
  } catch (e) {
    logError(`${component.name}/project.json is not valid JSON: ${e.message}`);
    return;
  }

  if (!projectConfig.targets || !projectConfig.targets.generate) {
    logError(`${component.name} is missing 'generate' target`);
    return;
  }

  logSuccess(`${component.name} has 'generate' target`);

  const generateTarget = projectConfig.targets.generate;

  if (!generateTarget.executor && !generateTarget.options?.command) {
    logError(`${component.name} generate target has no executor or command`);
  } else {
    logSuccess(`${component.name} generate target has executor/command`);
  }

  if (!generateTarget.inputs || generateTarget.inputs.length === 0) {
    logWarning(`${component.name} generate target has no inputs configured`);
  } else {
    logSuccess(
      `${component.name} generate target has ${generateTarget.inputs.length} input(s)`,
    );
  }

  if (!generateTarget.outputs || generateTarget.outputs.length === 0) {
    logWarning(`${component.name} generate target has no outputs configured`);
  } else {
    logSuccess(
      `${component.name} generate target has ${generateTarget.outputs.length} output(s)`,
    );

    for (const expectedOutput of component.expectedOutputs) {
      const hasOutput = generateTarget.outputs.some(
        (output) =>
          output.includes(expectedOutput) ||
          output.includes(`{projectRoot}/${expectedOutput}`),
      );
      if (!hasOutput) {
        logWarning(
          `${component.name} may be missing expected output: ${expectedOutput}`,
        );
      }
    }
  }

  if (projectConfig.targets.build) {
    const buildTarget = projectConfig.targets.build;
    if (buildTarget.dependsOn && buildTarget.dependsOn.includes('generate')) {
      logSuccess(`${component.name} build target depends on generate`);
    } else {
      logError(`${component.name} build target does not depend on generate`);
    }
  } else {
    logWarning(
      `${component.name} has no build target defined (may inherit from nx.json)`,
    );
  }
}

/**
 * Validate nx.json configuration.
 *
 * @returns {void}
 */
function validateNxJson() {
  const nxJsonPath = path.join(__dirname, '../../nx.json');

  console.log('\nValidating nx.json...');

  if (!fs.existsSync(nxJsonPath)) {
    logError('nx.json not found');
    return;
  }

  let nxConfig;
  try {
    nxConfig = JSON.parse(fs.readFileSync(nxJsonPath, 'utf8'));
  } catch (e) {
    logError(`nx.json is not valid JSON: ${e.message}`);
    return;
  }

  logSuccess('nx.json exists and is valid JSON');

  if (nxConfig.namedInputs) {
    logSuccess('nx.json has namedInputs configured');

    if (nxConfig.namedInputs.svgSources) {
      logSuccess('nx.json has svgSources namedInput');

      const hasSvgsChecksum = nxConfig.namedInputs.svgSources.some(
        (input) =>
          input.includes('.svgs-checksum') || input.includes('svgs-checksum'),
      );
      if (hasSvgsChecksum) {
        logSuccess('svgSources includes .svgs-checksum');
      } else {
        logWarning('svgSources may not include .svgs-checksum');
      }
    } else {
      logWarning('nx.json does not have svgSources namedInput');
    }
  } else {
    logWarning('nx.json does not have namedInputs configured');
  }
}

/**
 * Validate .svgs-checksum file exists.
 *
 * @returns {void}
 */
function validateSvgsChecksum() {
  const checksumPath = path.join(__dirname, '../../.svgs-checksum');

  console.log('\nValidating .svgs-checksum...');

  if (!fs.existsSync(checksumPath)) {
    logError('.svgs-checksum file not found');
    console.log('  Run: node scripts/codegen/update-svgs-checksum.js');
    return;
  }

  const checksum = fs.readFileSync(checksumPath, 'utf8').trim();
  if (checksum.length === 64) {
    logSuccess('.svgs-checksum exists and contains valid SHA256 hash');
  } else {
    logWarning('.svgs-checksum may not contain a valid hash');
  }
}

// Main execution
console.log('=== Code Generation Configuration Validator ===\n');

for (const component of CODEGEN_COMPONENTS) {
  validateComponent(component);
}

validateNxJson();
validateSvgsChecksum();

console.log('\n=== Summary ===');
if (hasErrors) {
  console.error('\nValidation FAILED with errors.');
  process.exit(1);
} else {
  console.log('\nValidation PASSED.');
  process.exit(0);
}
