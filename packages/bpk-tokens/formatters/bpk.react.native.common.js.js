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
import valueTemplate from './react-native-value-template';

export const tokenTemplate = ({ name, value, type }) =>
  `${_.camelCase(name)}: ${valueTemplate(value, type)}`;

export default tokens => {
  const { props } = sortTokens(tokens);

  const source = `
module.exports = {
  ${_.map(props, prop => tokenTemplate(prop)).join(',\n  ')}
};`;

  return [blockComment, source].join('\n');
};
