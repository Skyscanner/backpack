/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

// We disable eslint here as this package is listed as a peerDep so consumers are required to install this when using this package.
// eslint-disable-next-line import/no-unresolved
const nodeSass = require('node-sass');

module.exports = {
  'encodebase64($string)': (str) => {
    const buffer = Buffer.from(str.getValue());

    return nodeSass.types.String(buffer.toString('base64'));
  },
};
