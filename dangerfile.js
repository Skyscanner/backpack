/*
 *
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
 *
 */

// See http://danger.systems/js if you're not sure what this is.

// @flow

import fs from 'fs';

import { includes } from 'lodash';
import { danger, fail, warn, markdown } from 'danger';

// Applies to js, css, scss and sh files that are not located in dist or flow-typed folders.
const shouldContainLicensingInformation = (filePath) =>
  filePath.match(/\.(js|css|scss|sh)$/) &&
  !filePath.includes('dist/') &&
  !filePath.includes('flow-typed/');

const AVOID_EXACT_WORDS = [
  { word: 'react native', reason: 'Please use React Native with capitals' },
];

const createdFiles = danger.git.created_files;
const modifiedFiles = danger.git.modified_files;
const fileChanges = [...modifiedFiles, ...createdFiles];
const markdownChanges = fileChanges.filter((path) => path.endsWith('md'));

const svgsChangedOrCreated = fileChanges.some((filePath) =>
  filePath.endsWith('svg'),
);

if (svgsChangedOrCreated) {
  markdown(`
  This pull request changes some SVGs. Ensure they look as expected after they have been through the build process.

  If anything looks wrong, see _decisions/fill-rule-in-svgs.md_ for advice on how to fix it.
    `);
}

const componentChangedOrCreated = fileChanges.some((filePath) =>
  filePath.match(/packages\/bpk-component.+\/src\/.+\.js/),
);

if (componentChangedOrCreated) {
  markdown(`
  ## Browser support

  If this is a visual change, make sure you've tested it in multiple browsers,
  particularly IE11.
  `);
}

// If any of the packages have changed, the UNRELEASED log should have been updated.
const unreleasedModified = includes(modifiedFiles, 'UNRELEASED.md');
const packagesModified = fileChanges.some(
  (filePath) => filePath.startsWith('packages/') && !filePath.endsWith('.md'),
);
if (packagesModified && !unreleasedModified) {
  warn(
    "One or more packages have changed, but `UNRELEASED.md` wasn't updated.",
  );
}

// If source files have changed, the snapshots should have been updated.
const componentSourceFilesModified = fileChanges.some(
  (filePath) =>
    // packages/(one or more chars)/src/(one or more chars).js
    filePath.match(/packages\/.*bpk-component.+\/src\/.+\.js/) &&
    !filePath.includes('-test.'),
);

const snapshotsModified = fileChanges.some((filePath) =>
  filePath.endsWith('.js.snap'),
);

if (componentSourceFilesModified && !snapshotsModified) {
  warn(
    "Package source files (e.g. `packages/package-name/src/Component.js`) were updated, but snapshots weren't. Have you checked that the tests still pass?",
  );
}

// New files should include the Backpack license heading.
const unlicensedFiles = createdFiles.filter((filePath) => {
  if (shouldContainLicensingInformation(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    return !fileContent.includes(
      'Licensed under the Apache License, Version 2.0 (the "License")',
    );
  }
  return false;
});
if (unlicensedFiles.length > 0) {
  fail(
    `These new files do not include the license heading: ${unlicensedFiles.join(
      ', ',
    )}`,
  );
}

const nonModuleCssFiles = fileChanges.filter(
  (filePath) =>
    filePath.match(/bpk-component/) &&
    filePath.match(/\.s?css/) &&
    !filePath.match('_') &&
    !filePath.match(/\.module\.s?css/),
);
if (nonModuleCssFiles.length) {
  fail(
    `(S)CSS files must be named with the CSS Module convention - .module.(s)css. Please rename these files: ${nonModuleCssFiles.join(
      ', ',
    )}`,
  );
}

markdownChanges.forEach((path) => {
  const fileContent = fs.readFileSync(path);

  fileContent
    .toString()
    .split(/\r?\n/)
    .forEach((line, lineIndex) => {
      AVOID_EXACT_WORDS.forEach((phrase) => {
        if (line.includes(phrase.word)) {
          warn(`${phrase.reason} on line ${lineIndex + 1} in ${path}`);
        }
      });
    });
});
