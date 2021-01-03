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

import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import sortTokens from './sort-tokens';
import adjustTypography from './adjust-typography';
import { blockComment } from './license-header';
import valueTemplate from './react-native-value-template';

// The raw tokens are guaranteed to be generated at this point, we make sure they are done first in the gulpfile.
// We do this because I could not find any way to make Theo provide both the Android and iOS tokens as arguments to this function, because Theo
// merges all tokens we provide as input, and that will result in the function being always called with all tokens (iOS and Android),
// which is no good for us here, we need to know which tokens are Android and iOS to add the proper flow annotations.
const iosRawTokens = _.memoize(() =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, '../tokens/base.raw.ios.json')),
  ),
);

const androidRawTokens = _.memoize(() =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, '../tokens/base.raw.android.json')),
  ),
);

const SEMANTIC_TOKEN_REGEX = /(.*)_(LIGHT|DARK)_(.*)/;

const tokenTemplate = ({ name, value, type }) =>
  `export const ${_.camelCase(name)} = ${
    value ? valueTemplate(value, type) : value
  };`;

export const categoryTemplate = (
  categoryName,
  props,
) => `export const ${_.camelCase(categoryName)} = {
${_.map(props, prop => `${_.camelCase(prop.name)},`).join('\n')}
};`;

const extractSemanticTokens = allTokens => {
  const parsedTokens = Object.keys(allTokens).reduce(
    (semanticTokens, tokenKey) => {
      const token = allTokens[tokenKey];
      const match = token.name.match(SEMANTIC_TOKEN_REGEX);
      if (match) {
        // E.g. for backgroundLightColor this will be backgroundColor
        const key = `${match[1]}_${match[3]}`;
        const semanticToken = semanticTokens[key] || {
          name: key,
          type: 'semantic',
          value: {},
          category: `semantic${_.capitalize(token.category)}`,
        };
        // This will be light or dark
        const variation = match[2].toLowerCase();
        semanticToken.value[variation] = { ...token };
        semanticTokens[key] = semanticToken; // eslint-disable-line no-param-reassign
      }
      return semanticTokens;
    },
    {},
  );

  return Object.keys(parsedTokens).map(
    parsedToken => parsedTokens[parsedToken],
  );
};

const extractPlatformSpecifcTokens = (allTokens, platform) => {
  const otherPlatformTokens =
    platform === 'iosRn' ? androidRawTokens() : iosRawTokens();
  const otherPlatformKeys = Object.keys(otherPlatformTokens.props);

  const platformKeys = allTokens.props.map(token => token.name);

  const missingTokens = otherPlatformKeys
    .filter(token => platformKeys.indexOf(token) === -1)
    .reduce(
      (newTokens, token) => ({
        ...newTokens,
        [token]: {
          name: token,
          type: otherPlatformTokens.props[token].type,
          value: undefined,
          category: null,
          nullable: true,
        },
      }),
      {},
    );

  const nullableTokens = platformKeys
    .filter(token => otherPlatformKeys.indexOf(token) === -1)
    .reduce((acc, token) => ({ ...acc, [token]: true }), {});

  return [missingTokens, nullableTokens];
};

const bpkReactNativeEs6Js = (result, platform) => {
  const baseTokens = result.toJS();
  const semanticTokens = extractSemanticTokens(baseTokens.props);
  const allTokens = {
    ...baseTokens,
    props: [...baseTokens.props, ...semanticTokens],
  };

  const [
    platformSpecificTokens, // Tokens that only exist in the other (not current) platform
    nullableTokenNames, // Tokens that only exist in this platform
  ] = extractPlatformSpecifcTokens(allTokens, platform);

  const { props } = sortTokens(allTokens);

  const categories = _(props)
    .map(prop => prop.category)
    .uniq()
    .value();

  const singleTokens = _.map(props, prop =>
    tokenTemplate({
      ...adjustTypography(prop, platform),
      nullable: nullableTokenNames[prop.name],
    }),
  ).join('\n');

  const groupedTokens = categories
    .sort()
    .map(category =>
      categoryTemplate(
        category,
        _(props)
          .filter({ category })
          .value(),
      ),
    )
    .join('\n');

  const platformSpecific = _.map(platformSpecificTokens, prop =>
    tokenTemplate(prop),
  ).join('\n');

  return [
    '// @flow',
    blockComment,
    singleTokens,
    groupedTokens,
    `// ${platform === 'iosRn' ? 'Android' : 'iOS'} only tokens`,
    platformSpecific,
  ].join('\n');
};

export const bpkReactNativeEs6JsAndroid = result =>
  bpkReactNativeEs6Js(result, 'androidRn');

export const bpkReactNativeEs6JsIos = result =>
  bpkReactNativeEs6Js(result, 'iosRn');
