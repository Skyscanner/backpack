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

/* @flow */

import difference from 'lodash/difference';
import { type Theme } from 'react-native-bpk-theming';

const REQUIRED_THEME_ATTRIBUTES: [string] = ['buttonLinkTextColor'];

export const themeAttributesSupplied = (theme: Theme): boolean =>
  difference(REQUIRED_THEME_ATTRIBUTES, Object.keys(theme)).length === 0;

export const themePropType = (
  props: Object,
  propName: string,
  componentName: string,
): ?Error => {
  const { theme } = props;

  if (!theme) {
    return null;
  }

  if (!themeAttributesSupplied(theme)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. For button link, the \`theme\` prop must include \`${REQUIRED_THEME_ATTRIBUTES.join()}\``,
    );
  }
  return null;
};
