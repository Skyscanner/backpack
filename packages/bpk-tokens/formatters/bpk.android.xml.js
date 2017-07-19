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
import { xmlComment } from './license-header';

const tagName = type => (type === 'color' ? 'color' : 'property');

export const tokenTemplate = ({ name, value, type, category }) => (
  `  <${tagName(type)} name="${name.toUpperCase()}" category="${category}">${value.replace(/"/g, '\\"')}</${tagName(type)}>` // eslint-disable-line max-len
);

export default (json) => {
  const singleTokens = _.map(json.props, tokenTemplate).join('\n');
  const source = `<?xml version="1.0" encoding="utf-8"?>
${xmlComment}
<resources>
${singleTokens}
</resources>`;

  return [source].join('\n');
};
