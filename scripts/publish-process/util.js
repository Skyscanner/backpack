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
const readline = require('readline');

const colors = require('colors');
const YAML = require('yaml');
const semver = require('semver');
const cliProgress = require('cli-progress');

const bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);

let packagesPublished = 0;

const publishDone = () => {
  packagesPublished += 1;
  bar.update(packagesPublished);
};

const { enableKrypton, disableKrypton } = require('./krypton');
const {
  RELEASE_MODE_MAJOR,
  CHANGELOG_PATH,
  PLATFORM,
  RELEASE_MODE_PATCH,
  REPO,
  SLACK_PLATFORM_EMOJIS,
  YES_NO_REGEX,
  YES_REGEX,
  RELEASE_MODE_MINOR,
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

const applyNewVersions = (
  currentPackageMeta,
  documentedChanges,
  lernaChanges,
) => {
  let result = currentPackageMeta.filter(p => lernaChanges.includes(p.name));
  result = result.map(p => {
    const pkg = JSON.parse(JSON.stringify(p));
    const correspondingChange = documentedChanges.find(
      r => r.name === pkg.name,
    );
    let releaseMode = RELEASE_MODE_PATCH;
    if (correspondingChange) {
      if (correspondingChange.mode) {
        releaseMode = correspondingChange.mode;
      }
      if (correspondingChange.description) {
        pkg.description = correspondingChange.description;
      }
    }
    pkg.releaseMode = releaseMode;
    assert(
      semver.valid(pkg.currentVersion),
      `Package ${pkg.name} has invalid version ${pkg.currentVersion}`,
    );
    pkg.newVersion = semver.inc(pkg.currentVersion, releaseMode);
    return pkg;
  });
  return result;
};

const printOutSlackUpdate = (changes, changeSummary, publishTitle) => {
  const publishTitleURL = publishTitle
    .toLowerCase()
    .split(' ')
    .join('-')
    .split('`')
    .join('');

  let slackUpdate = `${SLACK_PLATFORM_EMOJIS} ${changeSummary}\n`;

  changes.forEach(c => {
    if (c.name && c.description && c.name.includes(`bpk-component-`)) {
      const componentName = c.name.split(`bpk-component-`)[1];
      slackUpdate += `:information_source: https://backpack.github.io/components/${componentName}/?platform=${PLATFORM}\n`;
    }
  });
  slackUpdate += `:clipboard: https://github.com/Skyscanner/${REPO}/blob/master/${CHANGELOG_PATH}#${publishTitleURL}`;

  execSync(`echo "${slackUpdate}" | pbcopy`);
  logOk(
    `\nNow paste this message in #backpack:\n${slackUpdate}. FYI it's already on your clipboard 😉`,
  );
};

const generateChangelogSection = (publishTitle, changes) => {
  const completeChanges = changes.filter(
    c => c.name && c.releaseMode && c.description,
  );
  if (completeChanges.length === 0) {
    return null;
  }
  let section = `# ${publishTitle}`;
  let currentMode = null;
  completeChanges.forEach(c => {
    if (c.releaseMode !== currentMode) {
      currentMode = c.releaseMode;
      section += `\n\n${getTitleForMode(c.releaseMode)}`;
    }
    section += `\n\n - ${c.name}: ${c.currentVersion} => ${c.newVersion}\n`;
    section += formatDescription(c.description);
  });
  section += '\n\n';
  return section;
};

const addChangelogEntry = changelogEntry => {
  const changelogContent = fs.readFileSync(CHANGELOG_PATH).toString();
  const newContent = changelogContent.split('\n');
  arrayInsert(newContent, 4, changelogEntry);

  fs.writeFileSync(CHANGELOG_PATH, newContent.join('\n'), 'utf8');
};

const updateChangelog = (changes, changeSummary) => {
  const publishTitle = `${getDate()} - ${changeSummary}`;
  const newChangelogEntry = generateChangelogSection(publishTitle, changes);
  if (verbose) {
    logVerbose(`newChangelogEntry`);
    logVerbose(newChangelogEntry || 'null');
  }
  if (newChangelogEntry) {
    addChangelogEntry(newChangelogEntry);
  }
  resetUnreleased();
  return publishTitle;
};

const publishPackageToNPM = (packageName, tag) =>
  new Promise(resolve => {
    const tagArg = tag ? ` --tag ${tag}` : '';
    exec(`(cd packages/${packageName} && npm publish${tagArg})`, null, () => {
      publishDone();
      resolve();
    });
  });

const publishPackagesToNPM = (changes, tag) =>
  new Promise(resolve => {
    bar.start(changes.length, 0);
    const tasks = changes.map(c => publishPackageToNPM(c.name, tag));

    Promise.all(tasks).then(result => {
      bar.stop();
      resolve(result);
    });
  });

const updateDependencies = dependencies => {
  if (!dependencies) {
    return;
  }

  Object.keys(dependencies).forEach(d => {
    if (d.match('bpk-*')) {
      const version = dependencies[d];
      // eslint-disable-next-line no-param-reassign
      dependencies[d] = `${version.split('-')[0]}-css.0`;
    }
  });
};

const appendToPackageVersion = (c, text) =>
  new Promise(resolve => {
    const packageJsonFilePath = path.join(c.path, 'package.json');
    const appendedVersion = `${c.currentVersion}-${text}`;
    const packageJsonData = JSON.parse(
      fs.readFileSync(packageJsonFilePath).toString(),
    );
    packageJsonData.version = appendedVersion;

    updateDependencies(packageJsonData.dependencies);
    updateDependencies(packageJsonData.devDependencies);

    fs.writeFileSync(
      packageJsonFilePath,
      `${JSON.stringify(packageJsonData, null, '  ')}\n`,
    );

    resolve();
  });

const appendToPackageVersions = (changes, text) =>
  new Promise(resolve => {
    const tasks = changes.map(c => appendToPackageVersion(c, text));

    Promise.all(tasks).then(result => {
      resolve(result);
    });
  });

const generateCommitMessage = changes => {
  let result = `Publish`;
  if (changes.length > 0) {
    result += '\n';
  }
  changes.forEach(c => {
    result += `\n - ${c.name}@${c.newVersion}`;
  });
  return result;
};

const performPublish = async (changes, changeSummary) => {
  const publishTitle = updateChangelog(changes, changeSummary);
  const commitMessage = generateCommitMessage(changes);
  updatePackageJsonFiles(changes);
  execSync(`npm run fix-bpk-dependencies`);
  if (!testing) {
    disableKrypton();
    execSync(`git add . && git commit -m "${commitMessage}" --no-verify`);
    await publishPackagesToNPM(changes, null);
    execSync(`git add . && git commit --amend --no-edit --no-verify`);
    createGitTags(changes);
    execSync(`git push`);
    execSync(`git push --tags`);
    enableKrypton();
  }
  logOk(`All good 👍`);
  printOutSlackUpdate(changes, changeSummary, publishTitle);
  process.exit(0);
};

const cancelPublish = () => {
  logOk(`Nothing has been changed!`);
  logOk(`See you later 👋`);
  process.exit(0);
};

const getConfirmation = () =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      'PLEASE CONFIRM THAT THE ABOVE CHANGES ARE CORRECT AND YOU WOULD LIKE TO CONTINUE\nEnter Y(es) or N(o)\n',
      answer => {
        if (!answer.match(YES_NO_REGEX)) {
          rl.close();
          resolve(getConfirmation());
          return;
        }

        let result = false;
        if (answer.match(YES_REGEX)) {
          result = true;
        }

        rl.close();
        resolve(result);
      },
    );
  });

const getChangeSummary = () =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Please summarise the changes you are publishing\n', answer => {
      rl.close();
      resolve(answer);
    });
  });

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
  performPublish,
  parseUnreleasedFile,
  processUnreleasedYaml,
  resetUnreleased,
  updatePackageJsonFiles,
  verbose,
  testing,
  applyNewVersions,
  getChangeSummary,
  getConfirmation,
  generateCommitMessage,
  generateChangelogSection,
  cancelPublish,
  appendToPackageVersions,
  publishPackagesToNPM,
};
