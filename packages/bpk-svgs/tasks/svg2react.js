/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import { Transform } from 'stream';
import { PluginError } from 'gulp-util';
import loader from 'react-svg-loader';

const PLUGIN_NAME = 'svg2react';

module.exports = (opts = {}) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      const query = `?${JSON.stringify({
        jsx: true,
        svgo: opts.svgo,
        styleProp: opts.styleProp,
      })}`;

      return loader.apply({
        query,
        cacheable() {},
        addDependency() {},
        async() {
          return (err, result) => {
            if (err) {
              return cb(err, null);
            }
            file.contents = new Buffer(result); // eslint-disable-line no-param-reassign
            return cb(null, file);
          };
        },
      }, [String(file.contents)]);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};
