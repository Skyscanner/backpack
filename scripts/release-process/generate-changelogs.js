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

const zip = require('lodash/zip');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const process = require('process');

const template = require('./package-changelog-template.js');
const {
  allChangelogPaths,
  determinePackageJsonPath,
  readPackageJson,
  readChangelog,
} = require('./util');

const writeFileAsync = promisify(fs.writeFile);

const determineOutputPath = changelogPath => {
  const basename = path.basename(changelogPath, '.yml');
  const markdownBasename = `${basename}.md`;

  return path.join(path.dirname(changelogPath), markdownBasename);
};

const generateHumanReadableChangelog = (parsedChangelog, packageName) =>
  template(parsedChangelog, packageName);

const writeChangelog = async ([outputPath, contents]) =>
  writeFileAsync(outputPath, contents, { encoding: 'utf8' });

(async () => {
  const changelogs = await allChangelogPaths();
  const outputPaths = changelogs.map(determineOutputPath);
  const parsedChangelogs = await Promise.all(changelogs.map(readChangelog));

  const markdownChangelogs = await Promise.all(
    zip(changelogs, parsedChangelogs).map(
      async ([changelogPath, parsedChangelog]) => {
        const packageJsonPath = determinePackageJsonPath(changelogPath);
        const packageJson = await readPackageJson(packageJsonPath);

        return generateHumanReadableChangelog(
          parsedChangelog,
          packageJson.name,
        );
      },
    ),
  );

  const output = zip(outputPaths, markdownChangelogs);

  await Promise.all(output.map(writeChangelog));
})().catch(e => {
  console.error(`Generating changelogs failed with error: ${e}`); // eslint-disable-line no-console
  process.exit(1);
});
