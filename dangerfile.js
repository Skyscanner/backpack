/*
 *
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import { commonFileWarnings } from 'danger-plugin-toolbox';

import * as meta from './meta.json';

const getRandomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

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
const markdownChanges = fileChanges.filter(path => path.endsWith('md'));

const thanksGifs = [
  'https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy.gif', // T.Hanks
  'https://media.giphy.com/media/6tHy8UAbv3zgs/giphy.gif', // Spongebob
  'https://media.giphy.com/media/xULW8v7LtZrgcaGvC0/giphy.gif', // Dog
  'https://media.giphy.com/media/GghJ32T5oPR8Q/giphy.gif', // Leslie Knope
  'https://media.giphy.com/media/26AHAw0aMmWwRI4Hm/giphy.gif', // David Mitchell
  'https://media.giphy.com/media/mbhseRYedlG5W/giphy.gif', // That guy from Who's Line Is It Anyway who looks like Bill Murray
  'https://media.giphy.com/media/3o6ZsXRBB9E67nUjL2/giphy.gif', // We love you
  'https://media.giphy.com/media/l3V0sNZ0NGomeurCM/giphy.gif', // Bowie
  'https://media.giphy.com/media/3rgXBvoeXt3MXlqhO0/giphy.gif', // Amazement
  'https://media.giphy.com/media/1OnDp7RwgphjG/giphy.gif', // Kumamon
  'https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif', // Cap salute
];

if (isPrExternal) {
  markdown(`
  # Hi ${author}!

  Thanks for the PR 🎉! Contributions like yours help to improve the design system
  for everybody and we appreciate you taking the effort to create this PR.

  ![Thanks](${getRandomFromArray(thanksGifs)})

  - [ ] Check this if you have read and followed the [contributing guidelines](https://github.com/Skyscanner/backpack/blob/master/CONTRIBUTING.md)

  If you're curious about how we review, please read through the
  [code review guidelines](https://github.com/Skyscanner/backpack/blob/master/CODE_REVIEW_GUIDELINES.md).
  `);
}

const componentChangedOrCreated = fileChanges.some(filePath =>
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
  filePath => filePath.startsWith('packages/') && !filePath.endsWith('.md'),
);
if (packagesModified && !unreleasedModified) {
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
  );
}

// New files should include the Backpack license heading.
const unlicensedFiles = createdFiles.filter(filePath => {
  // Applies to js, css, scss and sh files that are not located in dist or flow-typed folders.
  if (
    filePath.match(/\.(js|scss|sh)$/) &&
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

markdownChanges.forEach(path => {
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

commonFileWarnings('test.log', {
  msg:
    'The build logs contain these warnings (check the build output in Travis for more details):',
});
