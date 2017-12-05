/*
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
 */

/* eslint-disable no-console */

const fs = require('fs');
const { execSync } = require('child_process');

const errors = [];

const findReplace = (file, findReplaces) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    let result = data;
    findReplaces.forEach((fr) => {
      const splitFile = result.split(fr.find);
      if (splitFile.length === 1) {
        return null;
      }
      result = splitFile.join(fr.replace);
      return null;
    });

    fs.writeFile(file, result, 'utf8', (err2) => {
      if (err2) return console.log(err2);
      return null;
    });
    return null;
  });
};

const fixDependencyErrors = (packageFiles) => {
  const findReplaces = [];
  errors.forEach((error) => {
    findReplaces.push({
      find: new RegExp(`\\"${error.dependency}\\"\\:[ ]+\\"\\^[0-9]+\\.[0-9]+\\.[0-9]+\\"`, 'g'),
      replace: `"${error.dependency}": "${error.correctDependencyVersion}"`,
    });
    // eslint-disable-next-line max-len
    console.log(`${error.dependency} dependency upgraded from ${error.dependencyVersion} to ${error.correctDependencyVersion}`);
  });

  packageFiles.forEach((file) => {
    findReplace(file, findReplaces);
  });
};

const checkBpkDependencyList = (dependencies, correctVersions, packageName) => {
  Object.keys(dependencies).forEach((dependency) => {
    if (Object.keys(correctVersions).indexOf(dependency) !== -1) {
      const dependencyVersion = dependencies[dependency];
      const correctDependencyVersion = `^${correctVersions[dependency]}`;
      if (dependencyVersion !== correctDependencyVersion) {
        errors.push({
          packageName, dependency, dependencyVersion, correctDependencyVersion,
        });
      }
    }
  });
};

const checkBpkDependencies = (packageFile, correctVersions) => {
  const pfContent = JSON.parse(fs.readFileSync(packageFile));
  const {
    name: packageName,
    peerDependencies,
    dependencies,
    devDependencies,
  } = pfContent;

  if (peerDependencies !== undefined) {
    checkBpkDependencyList(peerDependencies, correctVersions, packageName);
  }
  if (dependencies !== undefined) {
    checkBpkDependencyList(dependencies, correctVersions, packageName);
  }
  if (devDependencies !== undefined) {
    checkBpkDependencyList(devDependencies, correctVersions, packageName);
  }
};

const getBpkPackageVersions = packageFiles => packageFiles.reduce((acc, pkg) => {
  if (pkg === '' || !pkg.includes('bpk-')) {
    return acc;
  }
  const pfContent = JSON.parse(fs.readFileSync(pkg));
  acc[pfContent.name] = pfContent.version;
  return acc;
}, {});

console.log('Checking Backpack cross dependencies...');
console.log('');

let packageFiles = execSync('find . -name package.json | grep -v node_modules').toString().split('\n');
packageFiles = packageFiles.filter(s => s !== '');
const bpkPackageVersions = getBpkPackageVersions(packageFiles);

packageFiles.forEach((pf) => {
  checkBpkDependencies(pf, bpkPackageVersions);
});

if (errors.length === 0) {
  console.log('All good.  👍');
} else if (process.argv.includes('--fix') || process.argv.includes('-f')) {
  fixDependencyErrors(packageFiles);
  console.log('\nAll fixed.  👍\n\n');
  console.log('Now remember to run\n\t _____________\n\t|             |\n\t| npm install |\n\t|_____________|');
} else {
  console.log('Some Backpack cross dependencies are outdated  😱');
  console.log('');
  errors.forEach((error) => {
    // eslint-disable-next-line max-len
    console.log(`${error.packageName} depends on ${error.dependency} ${error.dependencyVersion}, it should be ${error.correctDependencyVersion}`);
  });
  console.log('');
  process.exit(1);
}
console.log('');
