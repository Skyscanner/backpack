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
import { sassDocTemplate, nameTemplate, valueTemplate } from './bpk.scss';
import { blockComment } from './license-header';

export const variableTemplate = ({ name, value, type }) =>
  `${nameTemplate({ name })}: ${valueTemplate({ value, type })} !default;`;

export const template = ({ category, name, value, type }) =>
  `${sassDocTemplate({ category })}\n${variableTemplate({
    name,
    value,
    type,
  })}`;

export default json =>
  [blockComment, _.map(json.props, prop => template(prop)).join('\n')].join(
    '\n',
  );
