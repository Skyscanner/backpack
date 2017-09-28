/*
 *
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
 *
 */

// See http://danger.systems/js if you're not sure what this is.

import fs from 'fs';
import includes from 'lodash.includes';
import { danger, fail, warn, message } from 'danger';

const createdFiles = danger.git.created_files;
const modifiedFiles = danger.git.modified_files;
const fileChanges = [...modifiedFiles, ...createdFiles];

// Always be nice.
message('Thanks for the PR 🎉.');

// Ensure new web components are extensible by consumers.
const webComponentIntroduced = createdFiles.some(filePath => (
  filePath.match(/packages\/bpk-component.+\/src\/.+\.js/)
));

if (webComponentIntroduced) {
  message('It looks like you are introducing a web component.');
  warn('Ensure the component style is extensible via `className`.');
}

// Ensure new native components are extensible by consumers.
const nativeComponentIntroduced = createdFiles.some(filePath => (
  filePath.match(/native\/packages\/react-native-bpk-component.+\/src\/.+\.js/)
));

if (nativeComponentIntroduced) {
  message('It looks like you are introducing a native component.');
  warn('Ensure the component style is extensible via `style`.');
}

// If any of the packages have changed, the changelog should have been updated.
const changelogModified = includes(modifiedFiles, 'changelog.md');
const packagesModified = fileChanges.some(filePath => (
  filePath.startsWith('packages/') || filePath.startsWith('native/packages/')
));
if (packagesModified && !changelogModified) {
  warn('One or more packages have changed, but `changelog.md` wasn\'t updated.');
}

// If source files have changed, the snapshots should have been updated.
const componentSourceFilesModified = fileChanges.some(filePath => (
  // packages/(one or more chars)/src/(one or more chars).js
  filePath.match(/packages\/.*bpk-component.+\/src\/.+\.js/) && !filePath.includes('-test.')
));

const snapshotsModified = fileChanges.some(filePath => (
  filePath.endsWith('.js.snap')
));

if (componentSourceFilesModified && !snapshotsModified) {
  warn('Package source files (e.g. `package/packageName/src/packageName.js`) were updated, but snapshots weren\'t. Have you checked that the tests still pass?'); // eslint-disable-line max-len
}

// Ensure shrinkwrap changes are intentional.
const shrinkwrapUpdated = includes(modifiedFiles, 'changelog.md');
if (shrinkwrapUpdated) {
  warn('`npm-shrinkwrap.json` was updated. Ensure that this was intentional.');
}

// New files should include the Backpack license heading.
const unlicensedFiles = createdFiles.filter((filePath) => {
  // Applies to js, css, scss and sh files that are not located in dist folders.
  if (filePath.match(/\.(js|css|scss|sh)/) && !filePath.includes('dist/')) {
    const fileContent = fs.readFileSync(filePath);
    return !fileContent.includes('Licensed under the Apache License, Version 2.0 (the "License")');
  }
  return false;
});
if (unlicensedFiles.length > 0) {
  fail(`These new files do not include the license heading: ${unlicensedFiles.join(', ')}`);
}

// Encourage smaller PRs.
const bigPRThreshold = 8;
if (fileChanges.length > bigPRThreshold) {
  warn(`This PR contains ${fileChanges.length} files (${createdFiles.length} new, ${modifiedFiles.length} modified). Consider splitting it into multiple PRs.`); // eslint-disable-line max-len
}
