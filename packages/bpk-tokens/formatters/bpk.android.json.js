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

import _ from 'lodash';
import tinycolor from 'tinycolor2';

import sortTokens from './sort-tokens';

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

export const tokenTemplate = ({ name, value, type, category }) => ({
  name,
  value: valueTemplate(value, type),
  type,
  category,
});

export default result => {
  const { aliases, props } = sortTokens(result.toJS());

  const propsObj = _.keyBy(_.map(props, tokenTemplate), 'name');
  const propKeys = Object.keys(propsObj);
  return JSON.stringify({ aliases, props: propsObj, propKeys }, null, 2);
};
