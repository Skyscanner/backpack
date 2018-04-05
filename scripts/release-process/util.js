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
const flatten = require('lodash/flatten');
const globby = require('globby');
const fs = require('fs');
const yaml = require('js-yaml');
const { promisify } = require('util');
const path = require('path');

const CHANGELOG_GLOBS = ['packages/*/changelog.yml'];
const GLOBBY_OPTIONS = {
  gitignore: true,
};

const readFileAsync = promisify(fs.readFile);

const allChangelogPaths = async () =>
  Promise.all(CHANGELOG_GLOBS.map(glob => globby(glob, GLOBBY_OPTIONS))).then(
    flatten,
  );

const readChangelog = async changelogPath => {
  const content = await readFileAsync(changelogPath, { encoding: 'utf8' });
  return yaml.safeLoad(content);
};

const determinePackageJsonPath = changelogPath =>
  path.join(path.dirname(changelogPath), 'package.json');

const readPackageJson = async packageJsonpath =>
  JSON.parse(await readFileAsync(packageJsonpath));

module.exports = {
  allChangelogPaths,
  determinePackageJsonPath,
  readChangelog,
  readPackageJson,
};
