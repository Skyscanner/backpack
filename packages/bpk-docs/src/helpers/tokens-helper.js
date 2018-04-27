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
// We don't set the root font size in the backpack base stylesheet, which means that the root font size falls back to
// the browser default - typically 16px;
const ROOT_FONT_SIZE = 16;

export const formatTokenName = name => _.kebabCase(name);

export const toPx = value => {
  const parsed = parseFloat(value) * ROOT_FONT_SIZE;
  return parsed ? `${parsed}px` : null;
};

const TOKEN_FORMAT_MAP = {
  web: {
    size: value => {
      if (/rem$/.test(value)) {
        return `${value} (${toPx(value)})`;
      }
      return value;
    },
    'font-size': value => {
      if (/rem$/.test(value)) {
        return `${value} (${toPx(value)})`;
      }
      if (/%$/.test(value)) {
        return `${value} (${toPx(parseFloat(value) / 100)})`;
      }
      return value;
    },
  },
  ios: {
    size: value => (value ? `${value}pt` : value),
    'font-size': value => (value ? `${value}pt` : value),
  },
  android: {
    size: value => (value ? `${value}dp` : value),
    'font-size': value => (value ? `${value}sp` : value),
  },
};

export const getTokenValue = (token, platform) => {
  const { value, type } = token || {};
  const formats = TOKEN_FORMAT_MAP[platform] || {};

  if (formats[type]) {
    return formats[type](value);
  }

  return value || '-';
};

export const getTokens = (tokens, keys = null) => {
  const reducedTokens = (keys || Object.keys(tokens)).reduce((acc, key) => {
    if (!tokens[key]) return acc;
    acc[key] = tokens[key];
    return acc;
  }, {});

  // If all the tokens match our size naming convention then we can
  // order based on their name. Otherwise we should order on value
  if (
    Object.keys(reducedTokens).length > 0 &&
    Object.keys(reducedTokens).every(x =>
      Boolean(x.match(/.*_(XXS|XS|SM|BASE|LG|XL|XXL).*/i)),
    )
  ) {
    return _.chain(reducedTokens)
      .sortBy(token => {
        if (`${token.name}`.includes('_XXS')) {
          return 0;
        } else if (`${token.name}`.includes('_XS')) {
          return 1;
        } else if (`${token.name}`.includes('_SM')) {
          return 2;
        } else if (`${token.name}`.includes('_MD')) {
          return 3;
        } else if (`${token.name}`.includes('_BASE')) {
          return 4;
        } else if (`${token.name}`.includes('_LG')) {
          return 5;
        } else if (`${token.name}`.includes('_XL')) {
          return 6;
        } else if (`${token.name}`.includes('_XXL')) {
          return 7;
        }
        return 0;
      })
      .keyBy('name')
      .value();
  }
  return _.chain(reducedTokens)
    .sortBy(token => {
      const numericMatch = `${token.value}`.match(/([0-9]*[.]?[0-9]+)/g);
      if (!numericMatch) {
        return -1;
      }
      return parseFloat(numericMatch[0]);
    })
    .keyBy('name')
    .value();
};

export const getPlatformTokens = (
  webTokens,
  iosTokens,
  androidTokens,
  predicate,
) => {
  const keys = _.union([
    ...webTokens.propKeys.filter(key => predicate(webTokens.props[key])),
    ...iosTokens.propKeys.filter(key => predicate(iosTokens.props[key])),
    ...androidTokens.propKeys.filter(key =>
      predicate(androidTokens.props[key]),
    ),
  ]);

  return {
    web: getTokens(webTokens.props, keys),
    ios: getTokens(iosTokens.props, keys),
    android: getTokens(androidTokens.props, keys),
  };
};
