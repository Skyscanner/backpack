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

/*
 * How this works
 *
 * First of all, this scans all our packages and gets the current versions.
 * It then looks to see which packages have changed and therefore need releasing.
 *
 * It parses UNRELEASED.yaml to find out the semver change of each package for release.
 * If a changed package is not shown in UNRELEASED.yaml it will assume `patch`.
 *
 * It will then summarise all publishable changes for you, and ask you to confirm.
 * Once you confirm, it will update every package.json, update CHANGELOG.md, reset UNRELEASED.yaml, and push everything to git.
 *
 * Each package will also be published to NPM.
 *
 * Finally, it will generate a message for you to copy-paste to #backpack to inform consumers of published changes.
 */

/* @flow */

/* eslint-disable no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const YAML = require('yaml');
const colors = require('colors');
const semver = require('semver');

const SLACK_PLATFORM_EMOJIS = `:backpack: :safari: :firefox_quantum: :chrome:`;
const PLATFORM = 'web';
const REPO = 'backpack';

const YES_REGEX = /Y(es)?/i;
const YES_NO_REGEX = /Y(es)?|N(o)?/i;
const CHANGELOG_PATH = 'CHANGELOG.md';
const UNRELEASED_PATH = 'UNRELEASED.yaml';
const UNRELEASED_PATH_CLEAN = 'scripts/npm/UNRELEASED_CLEAN.yaml';
const UNRELEASED_FILE_SPLIT_POINT_1 = '> Place your changes below this line.';
const UNRELEASED_FILE_SPLIT_POINT_2 = '> Place your changes above this line.';
const RELEASE_MODE_PATCH = 'patch';
const RELEASE_MODE_MINOR = 'minor';
const RELEASE_MODE_MAJOR = 'major';
const TITLE_PATCH = '**Fixed:**';
const TITLE_MINOR = '**Added:**';
const TITLE_MAJOR = '**Breaking:**';
const YAML_SECTION_PATCH = 'FIXED';
const YAML_SECTION_MINOR = 'ADDED';
const YAML_SECTION_MAJOR = 'BREAKING';

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

const extractYaml = text => {
  assert(
    text.includes(UNRELEASED_FILE_SPLIT_POINT_1) &&
      text.includes(UNRELEASED_FILE_SPLIT_POINT_2),
    `UNRELEASED.yaml changes should be added between the following lines\n\t${UNRELEASED_FILE_SPLIT_POINT_1}\n\t${UNRELEASED_FILE_SPLIT_POINT_2}`,
  );
  let yamlBlock = text.split(UNRELEASED_FILE_SPLIT_POINT_1)[1];
  [yamlBlock] = yamlBlock.split(UNRELEASED_FILE_SPLIT_POINT_2);
  return yamlBlock;
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
  const unreleasedYaml = YAML.parse(extractYaml(unreleasedContent));
  if (verbose) {
    logVerbose(`unreleasedYaml`);
    logVerbose(YAML.stringify(unreleasedYaml));
  }
  assert(unreleasedYaml, `Failed to parse ${UNRELEASED_PATH}`);
  assert(
    validateUnreleasedEntries(unreleasedYaml, currentPackageMeta),
    `${UNRELEASED_PATH} is not valid. Please fix it and try again.`,
  );

  return processUnreleasedYaml(unreleasedYaml);
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
const generateChangelogSection = (publishTitle, changes) => {
  let section = `${publishTitle}`;
  let currentMode = null;
  changes.forEach(c => {
    if (c.name && c.releaseMode && c.description) {
      if (c.releaseMode !== currentMode) {
        currentMode = c.releaseMode;
        section += `\n\n${getTitleForMode(c.releaseMode)}`;
      }
      section += `\n\n - ${c.name}: ${c.currentVersion} => ${c.newVersion}\n`;
      section += formatDescription(c.description);
    }
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

const resetUnreleased = () => {
  execSync(`cp ${UNRELEASED_PATH_CLEAN} ${UNRELEASED_PATH}`);
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

const createGitTags = changes => {
  changes.forEach(c => {
    const tagMessage = `${c.name}@${c.newVersion}`;
    execSync(`git tag -a ${tagMessage} -m ${tagMessage}`);
  });
};

const performPublish = (changes, changeSummary) => {
  const publishTitle = `${getDate()} - ${changeSummary}`;
  const newChangelogEntry = generateChangelogSection(publishTitle, changes);
  if (verbose) {
    logVerbose(`newChangelogEntry`);
    logVerbose(newChangelogEntry);
  }
  addChangelogEntry(newChangelogEntry);
  resetUnreleased();
  updatePackageJsonFiles(changes);
  execSync(`npm run fix-bpk-dependencies`);
  if (!testing) {
    execSync(`git add . && git commit -m "Publish" --no-verify`);
    createGitTags(changes);
    execSync(`npx lerna publish from-package`);
    execSync(`git add . && git commit --amend --no-edit --no-verify`);
    execSync(`git push`);
    execSync(`git push --tags`);
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

const cli = async () => {
  const currentPackageMeta = getCurrentPackageMeta();
  if (verbose) {
    logVerbose(`currentPackageMeta`);
    logVerbose(currentPackageMeta);
  }
  const documentedChanges = parseUnreleasedFile(currentPackageMeta);
  if (verbose) {
    logVerbose(`documentedChanges`);
    logVerbose(documentedChanges);
  }
  const lernaChanges = getLernaChanges();
  if (verbose) {
    logVerbose(`lernaChanges`);
    logVerbose(lernaChanges);
  }

  const changesReadyForPublish = applyNewVersions(
    currentPackageMeta,
    documentedChanges,
    lernaChanges,
  );
  if (verbose) {
    logVerbose('changesReadyForPublish');
    logVerbose(changesReadyForPublish);
  }

  printOutChangeSummary(changesReadyForPublish);

  const confirmation = await getConfirmation();

  if (confirmation) {
    const changeSummary = await getChangeSummary();
    performPublish(changesReadyForPublish, changeSummary);
  } else {
    cancelPublish();
  }
};

cli().then(null);
