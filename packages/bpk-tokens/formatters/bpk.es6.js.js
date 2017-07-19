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
import { blockComment } from './license-header';

export const tokenTemplate = ({ name, value }) => (
  `export const ${_.camelCase(name)} = "${value.replace(/"/g, '\\"')}";`
);

export const categoryTemplate = (categoryName, props) => `export const ${_.camelCase(categoryName)} = {
${_.map(props, prop => `${_.camelCase(prop.name)},`).join('\n')}
};`;

export default (json) => {
  const categories = _(json.props).map(prop => prop.category).uniq().value();

  const singleTokens = _.map(json.props, prop => tokenTemplate(prop)).join('\n');
  const groupedTokens = categories
    .map(category => categoryTemplate(
      category,
      _(json.props).filter({ category }).value()),
    ).join('\n');

  return [blockComment, singleTokens, groupedTokens].join('\n');
};
