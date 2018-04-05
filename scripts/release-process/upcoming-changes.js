/*
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
 */
/* eslint-disable no-console */

const zip = require('lodash/zip');
const semver = require('semver');
const chalk = require('chalk');
const process = require('process');

const {
  allChangelogPaths,
  determinePackageJsonPath,
  readChangelog,
  readPackageJson,
} = require('./util');

(async () => {
  const changelogs = await allChangelogPaths();
  const parsedChangelogs = await Promise.all(changelogs.map(readChangelog));

  const data = zip(changelogs, parsedChangelogs);
  const upcomingChanges = (await Promise.all(
    data.map(async ([changelogPath, parsedChangelog]) => {
      const { upcoming: { changes } } = parsedChangelog;
      if (!changes) {
        return null;
      }

      const packageJsonPath = determinePackageJsonPath(changelogPath);
      const packageJson = await readPackageJson(packageJsonPath);
      const currentVersion = packageJson.version;

      let semverChange = null;
      if (changes.patch && changes.patch.length > 0) {
        semverChange = 'patch';
      }

      if (changes.minor && changes.minor.length > 0) {
        semverChange = 'minor';
      }

      if (changes.major && changes.major.length > 0) {
        semverChange = 'major';
      }

      return {
        name: packageJson.name,
        nextVersion: semver.inc(currentVersion, semverChange),
        changes,
        currentVersion,
      };
    }),
  )).filter(x => x);

  console.log(`${chalk.blue.bold('Upcoming changes:')}
${upcomingChanges.map(
    change =>
      `${chalk.green(
        `${change.name}: ${change.currentVersion} => ${change.nextVersion}
        `,
      )}`,
  )}
  `);
})().catch(e => {
  console.error(`Upcoming changes failed with error: ${e}`);
  process.exit(1);
});
