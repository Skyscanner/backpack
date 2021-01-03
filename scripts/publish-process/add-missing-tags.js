/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow */

const { execSync } = require('child_process');
const readline = require('readline');

const { GIT_HASH_REGEX } = require('./constants');
const {
  assert,
  createGitTags,
  logOk,
  logVerbose,
  verbose,
  testing,
} = require('./util');

const getCommitHash = () =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the hash of the commit to tag', answer => {
      if (!answer.match(GIT_HASH_REGEX)) {
        rl.close();
        resolve(getCommitHash());
        return;
      }

      rl.close();
      resolve(answer);
    });
  });

const getPackagesForTagging = () => {
  const lernaChanges = JSON.parse(
    execSync(`npx lerna changed -l --json`).toString(),
  );
  assert(lernaChanges, 'Could not retrieve lerna changes.');
  return lernaChanges.map(c => ({ name: c.name, newVersion: c.version }));
};

const cli = async () => {
  const lernaChanges = getPackagesForTagging();
  if (verbose) {
    logVerbose(`lernaChanges`);
    logVerbose(lernaChanges);
  }

  const commitHash = await getCommitHash();
  if (verbose) {
    logVerbose(`commitHash`);
    logVerbose(commitHash);
  }

  createGitTags(lernaChanges, commitHash);
  if (!testing) {
    execSync(`git push --tags`);
  }
  logOk(`All good 👍`);
};

cli().then(null);
