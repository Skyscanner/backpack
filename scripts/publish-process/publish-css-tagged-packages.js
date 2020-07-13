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
 *
 * Each package is then updated to have `-css.0` appended to the version,
 * and then `npm publish` is used to publish each package with the `css` tag for easy installation,
 */

/* @flow */

const {
  getCurrentPackageMeta,
  appendToPackageNames,
  publishPackagesToNPM,
  verbose,
  logVerbose,
} = require('./util');

const cli = async () => {
  const currentPackageMeta = getCurrentPackageMeta();
  if (verbose) {
    logVerbose(`currentPackageMeta`);
    logVerbose(currentPackageMeta);
  }

  // eslint-disable-next-line no-console
  console.log('Updating package versions...');
  await appendToPackageNames(currentPackageMeta, 'css');
  // eslint-disable-next-line no-console
  console.log('All good. 👍');

  await publishPackagesToNPM(currentPackageMeta);
};

cli().then(null);
