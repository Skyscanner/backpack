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

// If theming is ever expanded to support other types, this should be changed
// to something akin to BpkButton's theming functions.
const THEMING_ATTRIBUTE = 'horizontalNavSelectedTextColor';

const themePropType = (props, propName, componentName) => {
  const { theme } = props;
  if (!theme) {
    return false;
  }
  if (!theme[THEMING_ATTRIBUTE]) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. To theme a \`${componentName}\`, the \`theme\` prop must include \`${THEMING_ATTRIBUTE}\``,
    ); // eslint-disable-line max-len
  }
  return false;
};

export { THEMING_ATTRIBUTE, themePropType };
