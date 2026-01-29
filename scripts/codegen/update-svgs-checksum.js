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
 * SVG Integrity Check Script
 *
 * Calculates a hash of the @skyscanner/bpk-svgs package contents and writes
 * it to .svgs-checksum file. This allows Nx to detect when the external npm
 * package content changes and invalidate caches accordingly.
 *
 * Usage:
 *   node scripts/codegen/update-svgs-checksum.js [--verify]
 *
 * Options:
 *   --verify  Check if the current checksum matches, exit with error if not
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SVGS_PACKAGE_PATH = path.join(
  __dirname,
  '../../node_modules/@skyscanner/bpk-svgs',
);
const CHECKSUM_FILE = path.join(__dirname, '../../.svgs-checksum');

/**
 * Recursively get all files in a directory.
 *
 * @param {string} dir - Directory path to scan.
 * @param {string[]} [files=[]] - Array to collect file paths.
 * @returns {string[]} Array of file paths.
 */
function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Calculate a combined hash of all files in the bpk-svgs package.
 *
 * @returns {string} SHA256 hash of the package contents.
 */
function calculateChecksum() {
  const distPath = path.join(SVGS_PACKAGE_PATH, 'dist');

  if (!fs.existsSync(distPath)) {
    console.error(
      'Error: @skyscanner/bpk-svgs package not found. Run npm install first.',
    );
    process.exit(1);
  }

  const files = getAllFiles(distPath).sort();
  const hash = crypto.createHash('sha256');

  // Include the package version in the hash
  const packageJsonPath = path.join(SVGS_PACKAGE_PATH, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    hash.update(`version:${packageJson.version}\n`);
  }

  // Hash all file contents
  for (const file of files) {
    const relativePath = path.relative(SVGS_PACKAGE_PATH, file);
    const content = fs.readFileSync(file);
    hash.update(`${relativePath}:${content.length}\n`);
    hash.update(content);
  }

  return hash.digest('hex');
}

/**
 * Read the current checksum from file.
 *
 * @returns {string|null} The current checksum or null if file doesn't exist.
 */
function readCurrentChecksum() {
  if (!fs.existsSync(CHECKSUM_FILE)) {
    return null;
  }
  return fs.readFileSync(CHECKSUM_FILE, 'utf8').trim();
}

/**
 * Write checksum to file.
 *
 * @param {string} checksum - The checksum to write.
 * @returns {void}
 */
function writeChecksum(checksum) {
  fs.writeFileSync(CHECKSUM_FILE, `${checksum}\n`, 'utf8');
}

// Main execution
const args = process.argv.slice(2);
const verifyMode = args.includes('--verify');

const newChecksum = calculateChecksum();
const currentChecksum = readCurrentChecksum();

if (verifyMode) {
  if (currentChecksum === null) {
    console.error('Error: .svgs-checksum file not found.');
    console.error('Run: node scripts/codegen/update-svgs-checksum.js');
    process.exit(1);
  }

  if (currentChecksum !== newChecksum) {
    console.error('Error: SVG package checksum mismatch!');
    console.error(`  Expected: ${currentChecksum}`);
    console.error(`  Actual:   ${newChecksum}`);
    console.error('');
    console.error('The @skyscanner/bpk-svgs package contents have changed.');
    console.error('Run: node scripts/codegen/update-svgs-checksum.js');
    process.exit(1);
  }

  console.log('SVG checksum verification passed.');
  process.exit(0);
}

// Update mode
if (currentChecksum === newChecksum) {
  console.log('SVG checksum is already up to date.');
} else {
  writeChecksum(newChecksum);
  console.log('SVG checksum updated.');
  if (currentChecksum) {
    console.log(`  Previous: ${currentChecksum}`);
  }
  console.log(`  Current:  ${newChecksum}`);
}
