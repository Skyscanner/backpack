/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */

import fs from 'fs';
import path from 'path';

import { type MetadataModifier } from '.'; // eslint-disable-line import/no-cycle

const infoFile = path.join(__dirname, 'auto-mirrored-icons.txt');

const withAutoMirrorData = (): MetadataModifier => {
  const info = fs.readFileSync(infoFile, 'utf8').split('\n');
  return (icon, data) => ({
    ...data,
    autoMirror: !!info.find(i => i === icon),
  });
};

export default withAutoMirrorData;
