/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this buffer except in compliance with the License.
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

import through from 'through2';

const calculatePotentialMerges = obj => {
  const merges = {};

  obj.properties.forEach(p => {
    if (p.name.includes('LightColor')) {
      const newName = p.name.replace('LightColor', 'Color');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].light = p;
    }

    if (p.name.includes('DarkColor')) {
      const newName = p.name.replace('DarkColor', 'Color');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].dark = p;
    }
  });

  return merges;
};

const mergeJsonDynamicColours = str => {
  let obj = {};
  try {
    obj = JSON.parse(str);
  } catch (e) {
    // str is not valid JSON, so we simply return
    return str;
  }

  if (!obj.properties) {
    return str;
  }

  const merges = calculatePotentialMerges(obj);

  Object.keys(merges).forEach(mKey => {
    const merge = merges[mKey];
    if (merge.light && merge.dark) {
      const newObj = JSON.parse(JSON.stringify(merge.light));
      newObj.name = mKey;
      newObj.darkValue = merge.dark.value;
      newObj.originalDarkValue = merge.dark.originalValue;

      obj.properties.push(newObj);
    }
  });

  return JSON.stringify(obj, null, 2);
};

module.exports = () => {
  // eslint-disable-next-line consistent-return
  const stream = through.obj(function(buffer, enc, cb) {
    try {
      if (buffer.isStream()) {
        return cb();
      }

      if (buffer.isBuffer()) {
        let bufferContentsString = buffer.contents.toString();
        bufferContentsString = mergeJsonDynamicColours(bufferContentsString);
        // eslint-disable-next-line no-param-reassign
        buffer.contents = Buffer.from(bufferContentsString);
      }

      this.push(buffer);
      cb();
    } catch (e) {
      console.error(`Error whilst merging dynamic colours`, e);
    }
  });

  return stream;
};
