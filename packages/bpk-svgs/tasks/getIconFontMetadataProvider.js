/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import fs from 'fs';
import path from 'path';

export default (codepointsPath: string) => {
  const absolutePath = path.join(process.cwd(), codepointsPath);

  const codepoints = fs.existsSync(absolutePath)
    ? JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
    : {};

  return (file: string, callback: (err: ?Error, obj: ?Object) => mixed) => {
    const basename = path.basename(file);
    const name = basename.replace('.svg', '');

    if (codepoints[name]) {
      return callback(null, {
        path: file,
        name,
        unicode: [String.fromCodePoint(codepoints[name])],
      });
    }

    const codepointValues = Object.values(codepoints).map(value =>
      parseInt(value, 10),
    );

    if (codepointValues.length) {
      const sortedValues = codepointValues.sort();
      codepoints[name] = sortedValues[sortedValues.length - 1] + 1;
    } else {
      // The same starting codepoint used by the original underlying dependency
      // first used -> https://github.com/nfroidure/gulp-svgicons2svgfont#optionsstartunicode
      codepoints[name] = 59905;
    }

    const sortedCodepoints = Object.keys(codepoints)
      .sort()
      .reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = codepoints[key];
        return obj;
      }, {});

    try {
      const newFileContents = `${JSON.stringify(sortedCodepoints, null, 2)}\n`;
      fs.writeFileSync(absolutePath, newFileContents);
      return callback(null, {
        path: file,
        name,
        unicode: [String.fromCodePoint(codepoints[name])],
      });
    } catch (err) {
      return callback(err, null);
    }
  };
};
