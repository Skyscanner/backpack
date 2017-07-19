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

import path from 'path';
import { Transform } from 'stream';
import { PluginError } from 'gulp-util';

const PLUGIN_NAME = 'svg2datauri';

const mapTemplate = (options = {}) => `/// @group svgs\n$${options.mapName}: (\n${options.vars}\n);\n`;
const mapVariableTemplate = (options = {}) => `${options.varname}: '${options.base64Data}',`;
const colorOverride = color => `$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: ${color} !important }</style>`; // eslint-disable-line
const colorPlaceholder = '$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: $$$COLOR$$$ !important }</style>'; // eslint-disable-line

const encodeSvg = (svgContents, color) => {
  const contents = color
    ? svgContents.replace(/(<svg[^>]+>)/im, colorOverride(color))
    : svgContents;

  return `data:image/svg+xml;base64,${new Buffer(contents).toString('base64')}`;
};

const injectColorPlaceholder = (svgContents, svgName) => {
  const svg = svgContents.replace(/(<svg[^>]+>)/im, colorPlaceholder);

  return mapVariableTemplate({
    varname: svgName,
    base64Data: svg,
  });
};

const svg2datauri = (svgContents, svgName, colors) => {
  if (colors) {
    return Object.keys(colors).map(color => mapVariableTemplate({
      varname: `${svgName}-${color}`,
      base64Data: encodeSvg(svgContents, colors[color]),
    })).join('\n');
  }
  // no colors
  return mapVariableTemplate({
    varname: svgName,
    base64Data: encodeSvg(svgContents),
  });
};

export default (opts = {}) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer( // eslint-disable-line no-param-reassign
        svg2datauri(String(file.contents), path.basename(file.path).split('.')[0], opts.colors),
      );
      return cb(null, file);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};

export const sassMap = (mapName) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (!mapName) {
      return cb(new PluginError(PLUGIN_NAME, 'Cannot create Sass map without a name'));
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer( // eslint-disable-line no-param-reassign
        mapTemplate({
          mapName,
          vars: String(file.contents),
        }),
      );
      return cb(null, file);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};

export const svg2sassvar = () => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer( // eslint-disable-line no-param-reassign
        injectColorPlaceholder(String(file.contents), path.basename(file.path).split('.')[0]),
      );
      return cb(null, file);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};
