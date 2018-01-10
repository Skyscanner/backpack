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

const titlePropType = (props, propName, componentName) => {
  const titleValue = props[propName];
  if (props.showHeader && (!titleValue || typeof titleValue !== 'string')) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. There must be title if showHeader is true.`,
    ); // eslint-disable-line max-len
  }
  return false;
};

export default titlePropType;
