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

import camelCase from 'lodash/camelCase';

import sortTokens from './sort-tokens';
import { adjustTypographyIos } from './adjust-typography';

export default result => {
  const { props } = sortTokens(result.toJS());

  const properties = props.map(obj => {
    const prop = adjustTypographyIos(obj);
    return { ...prop, name: camelCase(prop.name) };
  });

  return JSON.stringify({ properties }, null, 2);
};
