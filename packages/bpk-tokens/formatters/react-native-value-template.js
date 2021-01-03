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

import tinycolor from 'tinycolor2';

export default function formatValue(value, type) {
  let formattedValue = value;

  switch (type) {
    case 'color': {
      const formattedColor = tinycolor(value);
      formattedValue = `"${formattedColor.toRgbString()}"`;
      break;
    }
    case 'duration': {
      const parsedDuration = Number.parseInt(value, 10);
      formattedValue = Number.isNaN(parsedDuration) ? value : parsedDuration;
      break;
    }
    case 'string': {
      formattedValue = `"${value.replace(/"/g, '\\"')}"`;
      break;
    }
    case 'semantic': {
      const parsedValues = Object.keys(value).reduce((parsed, tokenKey) => {
        const { value: currValue, type: currType } = value[tokenKey];
        return `${parsed} ${tokenKey}: ${formatValue(currValue, currType)},\n`;
      }, '');
      formattedValue = `{\n${parsedValues}}`;
      break;
    }
    default:
      formattedValue = value;
      break;
  }

  return formattedValue;
}
