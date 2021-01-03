/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

const calculatePotentialMerges = properties => {
  const merges = {};

  if (!properties) {
    return merges;
  }

  properties.forEach(p => {
    if (p.name && p.name.includes('LightColor')) {
      const newName = p.name.replace('LightColor', 'Color');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].light = p;
    }

    if (p.name && p.name.includes('DarkColor')) {
      const newName = p.name.replace('DarkColor', 'Color');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].dark = p;
    }

    if (p.name && p.name.includes('LIGHT_COLOR')) {
      const newName = p.name.replace('LIGHT_COLOR', 'COLOR');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].light = p;
    }

    if (p.name && p.name.includes('DARK_COLOR')) {
      const newName = p.name.replace('DARK_COLOR', 'COLOR');

      if (!merges[newName]) {
        merges[newName] = {};
      }
      merges[newName].dark = p;
    }
  });

  return merges;
};

const performMerge = (key, mergeDefinition) => {
  if (!mergeDefinition.light || !mergeDefinition.dark) {
    return null;
  }

  const newObj = { ...mergeDefinition.light };
  newObj.name = key;
  newObj.darkValue = mergeDefinition.dark.value;
  newObj.originalDarkValue = mergeDefinition.dark.originalValue;
  return newObj;
};

const listify = obj => {
  const list = [];
  if (!obj) {
    return list;
  }

  Object.keys(obj).forEach(k => {
    const newObj = { ...obj[k] };
    list.push(newObj);
  });
  return list;
};

const mergeJsonDynamicColours = str => {
  let obj = {};
  try {
    obj = JSON.parse(str);
  } catch (e) {
    // str is not valid JSON, so we simply return
    return str;
  }

  if (!obj.properties && !obj.props) {
    return str;
  }

  const propertyMerges = calculatePotentialMerges(obj.properties);
  const propsMerges = calculatePotentialMerges(listify(obj.props));

  Object.keys(propertyMerges).forEach(mKey => {
    const merge = propertyMerges[mKey];
    const mergeResult = performMerge(mKey, merge);
    if (mergeResult) {
      obj.properties.push(mergeResult);
    }
  });

  Object.keys(propsMerges).forEach(mKey => {
    const merge = propsMerges[mKey];
    const mergeResult = performMerge(mKey, merge);
    if (mergeResult) {
      obj.props[mKey] = mergeResult;
      obj.propKeys.push(mKey);
    }
  });

  return JSON.stringify(obj, null, 2);
};

module.exports = () => {
  // eslint-disable-next-line consistent-return, func-names
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
      // eslint-disable-next-line no-console
      console.error(`Error whilst merging dynamic colours`, e);
    }
  });

  return stream;
};
