/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButton from './src/BpkButton'; // eslint-disable-line import/no-named-as-default, import/no-named-as-default-member
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonDestructive from './src/BpkButtonDestructive';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonFeatured from './src/BpkButtonFeatured';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonLink from './src/BpkButtonLink'; // eslint-disable-line import/no-named-as-default, import/no-named-as-default-member
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonLinkOnDark from './src/BpkButtonLinkOnDark'; // eslint-disable-line import/no-named-as-default, import/no-named-as-default-member
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonPrimary from './src/BpkButtonPrimary';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonPrimaryOnDark from './src/BpkButtonPrimaryOnDark';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonPrimaryOnLight from './src/BpkButtonPrimaryOnLight';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonSecondary from './src/BpkButtonSecondary';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkButtonSecondaryOnDark from './src/BpkButtonSecondaryOnDark';
import { BpkButtonV2 } from './src/BpkButtonV2/BpkButton';

export { BUTTON_TYPES, SIZE_TYPES } from './src/BpkButtonV2/common-types';

export {
  buttonThemeAttributes,
  primaryThemeAttributes,
  primaryOnDarkThemeAttributes,
  primaryOnLightThemeAttributes,
  secondaryThemeAttributes,
  secondaryOnDarkThemeAttributes,
  featuredThemeAttributes,
  destructiveThemeAttributes,
} from './themeAttributes';

export default BpkButton;

export {
  BpkButtonPrimary,
  BpkButtonPrimaryOnDark,
  BpkButtonPrimaryOnLight,
  BpkButtonSecondary,
  BpkButtonSecondaryOnDark,
  BpkButtonDestructive,
  BpkButtonLink,
  BpkButtonLinkOnDark,
  BpkButtonFeatured,
  BpkButtonV2,
};
