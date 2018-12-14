/*
 *
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { includes } from 'lodash';
import { danger, fail, warn, message } from 'danger';

import * as meta from './meta.json';

const AVOID_EXACT_WORDS = [
  { word: 'react native', reason: 'Please use React Native with capitals' },
];

const BACKPACK_SQUAD_MEMBERS = meta.maintainers.map(
  maintainer => maintainer.github,
);
const author = danger.github.pr.user.login;
const isPrExternal = !BACKPACK_SQUAD_MEMBERS.includes(author);

const createdFiles = danger.git.created_files;
const modifiedFiles = danger.git.modified_files;
const fileChanges = [...modifiedFiles, ...createdFiles];
const declaredTrivial = danger.github.pr.title.includes('#trivial');
const markdown = fileChanges.filter(path => path.endsWith('md'));

// Be nice to our neighbours.
if (isPrExternal) {
  message('Thanks for the PR 🎉.');
}

// Ensure new components are extensible by consumers.
const componentIntroduced = createdFiles.some(filePath =>
  filePath.match(/packages\/bpk-component.+\/src\/.+\.js/),
);

if (componentIntroduced) {
  warn(
    'It looks like you are introducing a new component. Ensure the component style is extensible via `className`.',
  );
}

// If any of the packages have changed, the UNRELEASED log should have been updated.
const unreleasedModified = includes(modifiedFiles, 'UNRELEASED.md');
const packagesModified = fileChanges.some(
  filePath =>
    filePath.startsWith('packages/') &&
    !filePath.startsWith('packages/bpk-docs/'),
);
if (packagesModified && !unreleasedModified && !declaredTrivial) {
  warn(
    "One or more packages have changed, but `UNRELEASED.md` wasn't updated.",
  );
}

// If source files have changed, the snapshots should have been updated.
const componentSourceFilesModified = fileChanges.some(
  filePath =>
    // packages/(one or more chars)/src/(one or more chars).js
    filePath.match(/packages\/.*bpk-component.+\/src\/.+\.js/) &&
    !filePath.includes('-test.'),
);

const snapshotsModified = fileChanges.some(filePath =>
  filePath.endsWith('.js.snap'),
);

if (componentSourceFilesModified && !snapshotsModified) {
  warn(
    "Package source files (e.g. `packages/package-name/src/Component.js`) were updated, but snapshots weren't. Have you checked that the tests still pass?",
  ); // eslint-disable-line max-len
}

// Ensure package-lock changes are intentional.
const lockFileUpdated = includes(modifiedFiles, 'package-lock.json');
if (lockFileUpdated) {
  warn('`package-lock.json` was updated. Ensure that this was intentional.');
}

// New files should include the Backpack license heading.
const unlicensedFiles = createdFiles.filter(filePath => {
  // Applies to js, css, scss and sh files that are not located in dist or flow-typed folders.
  if (
    filePath.match(/\.(js|css|scss|sh)$/) &&
    !filePath.includes('dist/') &&
    !filePath.includes('flow-typed/')
  ) {
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

markdown.forEach(path => {
  const fileContent = fs.readFileSync(path);

  fileContent
    .toString()
    .split(/\r?\n/)
    .forEach((line, lineIndex) => {
      AVOID_EXACT_WORDS.forEach(phrase => {
        if (line.includes(phrase.word)) {
          warn(`${phrase.reason} on line ${lineIndex + 1} in ${path}`);
        }
      });
    });
});
