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

const fs = require('fs');

const colors = require('colors');

const UNRELEASED_FILE = 'UNRELEASED.md';
const CHANGELOG_FILE = 'CHANGELOG.md';

const createTimestamp = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, '0');
  const day = `${today.getDate()}`.padStart(2, '0');
  return `# ${year}-${month}-${day}`;
};

const insertEntriesIntoChangelog = (
  changelogContents,
  changesToInsert,
) => `${createTimestamp()}

${changesToInsert}

${changelogContents}`;

const cli = () => {
  console.log(
    colors.cyan(
      `Moving entries from ${UNRELEASED_FILE} to ${CHANGELOG_FILE}..`,
    ),
  );

  const unreleasedFileContents = fs.readFileSync(UNRELEASED_FILE, 'utf8');

  if (!unreleasedFileContents) {
    console.error(
      colors.red(
        `💀 Unable to parse the list of changes from ${UNRELEASED_FILE}. Please update ${CHANGELOG_FILE} manually.`,
      ),
    );
    process.exit(1);
  }

  const changelogFileContents = fs.readFileSync(CHANGELOG_FILE, 'utf8');
  const changelogWithChangesAdded = insertEntriesIntoChangelog(
    changelogFileContents,
    unreleasedFileContents,
  );

  if (!unreleasedFileContents) {
    console.error(
      colors.red(
        `💀 Unable to insert list of changes into ${CHANGELOG_FILE}. Please enter the changes manually.`,
      ),
    );
    process.exit(1);
  }

  // Write the changes to the changelog.
  fs.writeFileSync(CHANGELOG_FILE, changelogWithChangesAdded);

  // Empty out the unreleased file.
  fs.writeFileSync(UNRELEASED_FILE, '');

  console.log(
    colors.green(
      `Successfully moved changes from ${UNRELEASED_FILE} to ${CHANGELOG_FILE} 🎉`,
    ),
  );

  console.log(
    colors.yellow(
      `Now add the published version numbers alongside the package names in ${CHANGELOG_FILE} then push the change directly to the main branch (we haven't automated this part yet).`,
    ),
  );
};

cli();
