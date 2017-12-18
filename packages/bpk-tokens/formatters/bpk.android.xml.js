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

import _ from 'lodash';
import tinycolor from 'tinycolor2';
import { xmlComment } from './license-header';

const tagName = type => (type === 'color' ? 'color' : 'property');

const valueTemplate = (value, type) => {
  let formattedValue = value;

  switch (type) {
    case 'color': {
      const formattedColor = tinycolor(value);
      formattedValue = `${formattedColor
        .toHex8String()
        .replace(/^#(.{6})(.{2})/, '#$2$1')}`;
      break;
    }
    case 'string':
      formattedValue = `${value.replace(/"/g, '\\"')}`;
      break;
    case 'size':
      formattedValue = `${value}dp`;
      break;
    case 'font-size':
      formattedValue = `${value}sp`;
      break;
    default:
      formattedValue = value;
      break;
  }
  return formattedValue;
};

export const tokenTemplate = ({ name, value, type, category }) =>
  `  <${tagName(
    type,
  )} name="${name.toUpperCase()}" category="${category}">${valueTemplate(
    value,
    type,
  )}</${tagName(type)}>`; // eslint-disable-line max-len

export default json => {
  const singleTokens = _.map(json.props, tokenTemplate).join('\n');
  const source = `<?xml version="1.0" encoding="utf-8"?>
${xmlComment}
<resources>
${singleTokens}
</resources>`;

  return [source].join('\n');
};
