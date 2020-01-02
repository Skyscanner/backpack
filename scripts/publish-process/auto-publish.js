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

const {
  getCurrentPackageMeta,
  parseUnreleasedFile,
  getLernaChanges,
  applyNewVersions,
  getConfirmation,
  getChangeSummary,
  cancelPublish,
  performPublish,
  printOutChangeSummary,
  verbose,
  logVerbose,
} = require('./util');

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
    await performPublish(changesReadyForPublish, changeSummary);
  } else {
    cancelPublish();
  }
};

cli().then(null);
