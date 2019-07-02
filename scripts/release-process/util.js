/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

const colors = require('colors');
const YAML = require('yaml');

const {
  RELEASE_MODE_MAJOR,
  RELEASE_MODE_MINOR,
  RELEASE_MODE_PATCH,
  TITLE_MAJOR,
  TITLE_MINOR,
  TITLE_PATCH,
  UNRELEASED_PATH,
  UNRELEASED_PATH_CLEAN,
  YAML_SECTION_MAJOR,
  YAML_SECTION_MINOR,
  YAML_SECTION_PATCH,
} = require('./constants');

const verbose = process.argv.includes(`--verbose`);
const testing = process.argv.includes(`--testing`);

const logVerbose = (...args) => {
  console.log(colors.cyan(...args));
};

const logOk = (...args) => {
  console.log(colors.green(...args));
};

const logWarn = (...args) => {
  console.log(colors.yellow(...args));
};

const logError = (...args) => {
  console.error(colors.red(...args));
};

const arrayInsert = (arr, index, item) => arr.splice(index, 0, item);

const assert = (condition, message) => {
  if (condition) {
    return;
  }

  logError(message);
  process.exit(1);
};

const getLernaChanges = () => {
  const lernaChanges = JSON.parse(
    execSync(`npx lerna changed -l --json`).toString(),
  );
  assert(lernaChanges, 'Could not retrieve lerna changes.');
  return lernaChanges.map(c => c.name);
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

const getDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getTitleForMode = mode => {
  if (mode === RELEASE_MODE_MINOR) {
    return TITLE_MINOR;
  }
  if (mode === RELEASE_MODE_MAJOR) {
    return TITLE_MAJOR;
  }
  return TITLE_PATCH;
};

const formatDescription = description => {
  if (!description || description.length === 0) {
    return '';
  }

  const result = [];
  description.forEach(d => {
    if (d && !d.match(/^\s+$/)) {
      result.push(`   - ${d}`);
    }
  });
  return result.join('\n');
};

const updatePackageJsonFiles = changes => {
  changes.forEach(c => {
    const packageJsonFile = `${c.path}/package.json`;
    const packageJsonData = JSON.parse(
      fs.readFileSync(packageJsonFile).toString(),
    );
    packageJsonData.version = c.newVersion;
    fs.writeFileSync(
      packageJsonFile,
      `${JSON.stringify(packageJsonData, null, '  ')}\n`,
    );
  });
};

const createGitTags = (changes, commitHash = '') => {
  changes.forEach(c => {
    const tagMessage = `${c.name}@${c.newVersion}`;
    const command = `git tag -a ${tagMessage} ${commitHash} -m ${tagMessage}`;
    if (testing) {
      logOk(command);
    } else {
      execSync(`git tag -a ${tagMessage} -m ${tagMessage}`);
    }
  });
};

const resetUnreleased = () => {
  execSync(`cp ${UNRELEASED_PATH_CLEAN} ${UNRELEASED_PATH}`);
};

const validateUnreleasedEntries = (yaml, currentPackageMeta) => {
  if (!yaml) {
    return false;
  }
  if (verbose) {
    logVerbose(`Validating yaml`, yaml);
  }
  Object.keys(yaml).forEach(key => {
    if (
      key !== YAML_SECTION_MAJOR &&
      key !== YAML_SECTION_MINOR &&
      key !== YAML_SECTION_PATCH
    ) {
      logError(
        `Section in ${UNRELEASED_PATH} should be one of ${YAML_SECTION_PATCH}, ${YAML_SECTION_MINOR}, or ${YAML_SECTION_MAJOR}. Found ${key}`,
      );
      return false;
    }
    yaml[key].forEach(entry => {
      const entryName = Object.keys(entry)[0];
      if (verbose) {
        logVerbose(`Validating entry`, entryName);
      }
      const correspondingPackage = currentPackageMeta.find(
        p => p.name === entryName,
      );
      if (!entryName || !correspondingPackage) {
        logError(
          `${UNRELEASED_PATH} contains an entry for package ${entryName} but no such package exists in the project.`,
        );
      }
    });
    return true;
  });
  return true;
};

const getModeFromYamlSection = yamlSection => {
  if (yamlSection === YAML_SECTION_MINOR) {
    return RELEASE_MODE_MINOR;
  }
  if (yamlSection === YAML_SECTION_MAJOR) {
    return RELEASE_MODE_MAJOR;
  }
  return RELEASE_MODE_PATCH;
};

const processUnreleasedYaml = yaml => {
  const result = [];
  if (!yaml) {
    return result;
  }
  const yamlKeys = Object.keys(yaml);
  yamlKeys.forEach(k => {
    const entries = yaml[k];
    entries.forEach((e, eIndex) => {
      const entryKeys = Object.keys(e);
      entryKeys.forEach(ek => {
        if (verbose) {
          console.log(`entryKeys`, entryKeys);
        }
        const changes = entries[eIndex][ek];
        const newResult = {
          name: ek,
          mode: getModeFromYamlSection(k),
          description: changes,
        };
        result.push(newResult);
      });
    });
  });

  return result;
};

const parseUnreleasedFile = currentPackageMeta => {
  const unreleasedContent = fs.readFileSync(UNRELEASED_PATH).toString();
  assert(unreleasedContent, `Failed to read ${UNRELEASED_PATH}`);
  const unreleasedYaml = YAML.parse(unreleasedContent) || [];
  if (verbose) {
    logVerbose(`unreleasedYaml`);
    logVerbose(YAML.stringify(unreleasedYaml));
  }
  assert(
    validateUnreleasedEntries(unreleasedYaml, currentPackageMeta),
    `${UNRELEASED_PATH} is not valid. Please fix it and try again.`,
  );

  return processUnreleasedYaml(unreleasedYaml);
};

const printOutChanges = (changes, logFn) => {
  logOk(`\n`);
  changes.forEach(c => {
    logFn(
      `${c.releaseMode} change to package ${c.name}: ${c.currentVersion} => ${
        c.newVersion
      }`,
    );
    logOk(`${formatDescription(c.description)}`);
    logOk(``);
  });
};

const printOutChangeSummary = changes => {
  const undocumentedChanges = changes.filter(c => !c.description);
  const documentedChanges = changes.filter(c => !!c.description);
  if (undocumentedChanges.length > 0) {
    logWarn(`\n`);
    logWarn(
      `The following changes will be published with NO CHANGELOG ENTRY! 🙀`,
    );
    printOutChanges(undocumentedChanges, logWarn);
  }
  if (documentedChanges.length > 0) {
    console.log(``);
    logOk(`\n`);
    logOk(
      `The following changes will be published and reflected in CHANGELOG.md 😎`,
    );
    printOutChanges(documentedChanges, logOk);
  }
};

module.exports = {
  arrayInsert,
  assert,
  createGitTags,
  formatDescription,
  printOutChangeSummary,
  getCurrentPackageMeta,
  getDate,
  getLernaChanges,
  getModeFromYamlSection,
  getTitleForMode,
  logError,
  logOk,
  logVerbose,
  logWarn,
  parseUnreleasedFile,
  processUnreleasedYaml,
  resetUnreleased,
  updatePackageJsonFiles,
  verbose,
  testing,
};
