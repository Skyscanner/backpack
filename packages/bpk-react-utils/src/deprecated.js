/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow strict */
import { type PropType } from 'prop-types';

const deprecated = (propType: PropType, alternativeSuggestion: string) => (
  props: { [string]: any },
  propName: string,
  componentName: string,
  ...rest: [any]
) => {
  if (props[propName] != null) {
    const message = `"${propName}" property of "${componentName}" has been deprecated. ${alternativeSuggestion}`;
    // eslint-disable-next-line no-console
    console.warn(message);
  }
  return propType(props, propName, componentName, ...rest);
};

export default deprecated;
