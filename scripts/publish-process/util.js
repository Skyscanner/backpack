/*
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
 */

/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');

const colors = require('colors');
const cliProgress = require('cli-progress');

const bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);

let packagesPublished = 0;

const publishDone = () => {
  packagesPublished += 1;
  bar.update(packagesPublished);
};

const verbose = process.argv.includes(`--verbose`);
const testing = process.argv.includes(`--testing`);

const logVerbose = (...args) => {
  console.log(colors.cyan(...args));
};

const logOk = (...args) => {
  console.log(colors.green(...args));
};

const logError = (...args) => {
  console.error(colors.red(...args));
};

const assert = (condition, message) => {
  if (condition) {
    return;
  }

  logError(message);
  process.exit(1);
};

const getCurrentPackageMeta = () => {
  const packages = JSON.parse(execSync(`npx lerna ls -l --json`).toString());
  assert(packages && packages.map, 'Failed to get current package meta');
  return packages.map(p => ({
    name: p.name,
    private: p.private,
    path: p.location,
    currentVersion: p.version,
  }));
};

const createGitTags = (changes, commitHash = '') => {
  changes.forEach(c => {
    const tagMessage = `${c.name}@${c.newVersion}`;
    const command = `git tag -a ${tagMessage} ${commitHash} -m ${tagMessage}`;
    if (verbose) {
      logVerbose(`executing command: ${command}`);
    }
    if (testing) {
      logOk(command);
    } else {
      // If the tag already exists we need not worry
      execSync(`git tag -a ${tagMessage} -m ${tagMessage} || true`);
    }
  });
};

const publishPackageToNPM = packageName =>
  new Promise(resolve => {
    exec(`(cd packages/${packageName} && npm publish)`, null, () => {
      publishDone();
      resolve();
    });
  });

const publishPackagesToNPM = changes =>
  new Promise(resolve => {
    bar.start(changes.length, 0);
    const tasks = changes.map(c => publishPackageToNPM(c.name));

    Promise.all(tasks).then(result => {
      bar.stop();
      resolve(result);
    });
  });

const updateDependencies = dependencies => {
  if (!dependencies) {
    return;
  }
  const dependencyList = {};

  Object.keys(dependencies).forEach(depName => {
    const depValue = dependencies[depName];
    if (depName.match('bpk-*')) {
      const newName = `${depName}-css`;
      dependencyList[newName] = depValue;
    } else {
      dependencyList[depName] = depValue;
    }
  });

  // eslint-disable-next-line consistent-return
  return dependencyList;
};

const appendToPackageName = (c, text) =>
  new Promise(resolve => {
    const packageJsonFilePath = path.join(c.path, 'package.json');
    const appendedName = `${c.name}-${text}`;
    const packageJsonData = JSON.parse(
      fs.readFileSync(packageJsonFilePath).toString(),
    );
    packageJsonData.name = appendedName;

    packageJsonData.dependencies = updateDependencies(
      packageJsonData.dependencies,
    );
    packageJsonData.devDependencies = updateDependencies(
      packageJsonData.devDependencies,
    );

    fs.writeFileSync(
      packageJsonFilePath,
      `${JSON.stringify(packageJsonData, null, '  ')}\n`,
    );

    resolve();
  });

const appendToPackageNames = (changes, text) =>
  new Promise(resolve => {
    const tasks = changes.map(c => appendToPackageName(c, text));

    Promise.all(tasks).then(result => {
      resolve(result);
    });
  });

module.exports = {
  appendToPackageNames,
  assert,
  createGitTags,
  getCurrentPackageMeta,
  logOk,
  logVerbose,
  publishPackagesToNPM,
  testing,
  verbose,
};
