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

import androidTokenAliases from '../src/android/base/aliases.json';
import iosTokenAliases from '../src/ios/base/aliases.json';

// These are the default letter tracking values used by SF Pro and SF Pro Display for each font-size. They are given in 1/1000em.
// They can be found at https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography#font-usage-and-tracking
const sfProTracking = {
  6: 41,
  8: 26,
  9: 19,
  10: 12,
  11: 6,
  12: 0,
  13: -6,
  14: -11,
  15: -16,
  16: -20,
  17: -24,
  18: -25,
  19: -26,
  20: 19,
  21: 17,
  22: 16,
  24: 15,
  25: 14,
  27: 13,
  30: 12,
  33: 11,
  36: 11,
  40: 10,
  42: 10,
  44: 9,
  48: 8,
  50: 7,
  53: 6,
  56: 5,
  60: 4,
  65: 3,
  69: 2,
  79: 0,
  80: 0,
};

const getCorrespondingFontSizeTokens = (aliases, letterSpacingKey) => {
  let modifier = null;
  if (letterSpacingKey.includes('TEXT')) {
    [, modifier] = letterSpacingKey.split('_');
  } else {
    [, , modifier] = letterSpacingKey.split('_');
  }
  const fontSizeKey = `FONT_SIZE_${modifier}`;
  return aliases.aliases[fontSizeKey];
};

const getCorrespondingFontSizeTokensAndroid = letterSpacingKey =>
  getCorrespondingFontSizeTokens(androidTokenAliases, letterSpacingKey);

const getCorrespondingFontSizeTokensIos = letterSpacingKey =>
  getCorrespondingFontSizeTokens(iosTokenAliases, letterSpacingKey);

const adjustTypographyAndroidRn = prop => prop;

const adjustTypographyAndroid = prop => {
  let adjustedValue = prop.value;
  if (prop.type === 'letter-spacing') {
    const correspondingFontSize = getCorrespondingFontSizeTokensAndroid(
      prop.name,
    );
    if (correspondingFontSize === undefined) {
      throw new Error(
        `A suitable adjustment for token ${prop.name} could not be found as no corresponding font-size exists`,
      );
    }
    adjustedValue = parseFloat(prop.value) / correspondingFontSize;
  }
  return { ...prop, value: adjustedValue };
};

const adjustTypographyIos = prop => {
  let adjustedValue = prop.value;
  if (prop.value === 'null') {
    adjustedValue = null;
  } else if (prop.type === 'letter-spacing') {
    const correspondingFontSize = getCorrespondingFontSizeTokensIos(prop.name);
    if (correspondingFontSize === undefined) {
      throw new Error(
        `A suitable adjustment for token ${prop.name} could not be found as no corresponding font-size exists`,
      );
    }
    const sfProTrackingForFont = sfProTracking[correspondingFontSize];
    if (sfProTrackingForFont === undefined) {
      throw new Error(
        `A suitable adjustment for token ${prop.name} could not be found as no corresponding SF Pro tracking value exists`,
      );
    }
    const adjustment = (sfProTrackingForFont * correspondingFontSize) / 1000;
    adjustedValue = parseFloat(prop.value) - adjustment;
  }
  return { ...prop, value: adjustedValue };
};

const adjustTypographyIosRn = adjustTypographyIos;

const adjustTypography = (prop, platform) => {
  let adjustmentFunction = value => value;
  if (platform === 'android') {
    adjustmentFunction = adjustTypographyAndroid;
  } else if (platform === 'ios') {
    adjustmentFunction = adjustTypographyIos;
  } else if (platform === 'androidRn') {
    adjustmentFunction = adjustTypographyAndroidRn;
  } else if (platform === 'iosRn') {
    adjustmentFunction = adjustTypographyIosRn;
  }
  return adjustmentFunction(prop);
};

export default adjustTypography;
export {
  adjustTypographyIos,
  adjustTypographyAndroid,
  adjustTypographyIosRn,
  adjustTypographyAndroidRn,
};
