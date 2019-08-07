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
 * Each package will then be published to NPM, and the "Publish" commit
 *
 * Finally, it will generate a message for you to copy-paste to #backpack to inform consumers of published changes.
 */

/* @flow */

const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const semver = require('semver');

const {
  CHANGELOG_PATH,
  PLATFORM,
  RELEASE_MODE_PATCH,
  REPO,
  SLACK_PLATFORM_EMOJIS,
  YES_NO_REGEX,
  YES_REGEX,
} = require('./constants');
const {
  arrayInsert,
  assert,
  createGitTags,
  formatDescription,
  getCurrentPackageMeta,
  getDate,
  getLernaChanges,
  getTitleForMode,
  logOk,
  logVerbose,
  parseUnreleasedFile,
  resetUnreleased,
  updatePackageJsonFiles,
  verbose,
  printOutChangeSummary,
  testing,
} = require('./util');

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

const performPublish = (changes, changeSummary) => {
  const publishTitle = `${getDate()} - ${changeSummary}`;
  const newChangelogEntry = generateChangelogSection(publishTitle, changes);
  if (verbose) {
    logVerbose(`newChangelogEntry`);
    logVerbose(newChangelogEntry);
  }
  if (newChangelogEntry) {
    addChangelogEntry(newChangelogEntry);
  }
  resetUnreleased();
  updatePackageJsonFiles(changes);
  execSync(`npm run fix-bpk-dependencies`);
  if (!testing) {
    execSync(`git add . && git commit -m "Publish" --no-verify`);
    execSync(`npm run lerna -- publish from-package --ignore-scripts || true`);
    execSync(`git add . && git commit --amend --no-edit --no-verify`);
    createGitTags(changes);
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
