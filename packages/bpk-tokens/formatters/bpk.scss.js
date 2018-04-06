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

import sortTokens from './sort-tokens';
import { blockComment } from './license-header';

export const nameTemplate = ({ name }) => `$bpk-${_.kebabCase(name)}`;

export const valueTemplate = ({ value, type }) =>
  type === 'media-query' ? `"${value}"` : value;

export const variableTemplate = ({ name, value, type }) =>
  `${nameTemplate({ name })}: ${valueTemplate({ value, type })};`;

export const sassDocTemplate = ({ category }) => `/// @group ${category}`;

export const template = ({ category, name, value, type }) =>
  `${sassDocTemplate({ category })}\n${variableTemplate({
    name,
    value,
    type,
  })}`;

export default tokens => {
  const { props } = sortTokens(tokens);

  return [blockComment, _.map(props, prop => template(prop)).join('\n')].join(
    '\n',
  );
};
