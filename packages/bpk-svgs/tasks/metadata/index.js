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

/* @flow strict */

import { flow } from 'lodash';
import through from 'through2';
import Vinyl from 'vinyl';

import autoMirror from './automirror';

const addMetadata = flow(autoMirror());

const createMetadata = () => {
  const metadata = {};

  const bufferContents = (file, enc, cb) => {
    if (file.isNull()) {
      cb();
      return;
    }

    const icon = file.stem; // filename without suffix
    metadata[icon] = addMetadata({ icon, data: {} }).data;
    cb();
  };

  function endStream(cb) {
    const outFile = new Vinyl({
      path: 'metadata.json',
    });

    outFile.contents = Buffer.from(JSON.stringify(metadata), 'utf-8');
    this.push(outFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};

export default createMetadata;
