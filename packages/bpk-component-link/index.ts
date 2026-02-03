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
import BpkButtonLink, { type Props as BpkButtonLinkProps } from './src/BpkButtonLink';
import BpkLink from './src/BpkLink';
import themeAttributes, {
  linkAlternateThemeAttributes,
} from './src/themeAttributes';

import type { BpkLinkProps } from './src/common-types';

/**
 * @deprecated Use BpkLinkProps for polymorphic usage
 */
export type { BpkButtonLinkProps };
/**
 * @deprecated Use `<BpkLink as="button" />` instead.
 */
export { BpkButtonLink };

export type { BpkLinkProps };

export default BpkLink;
export { themeAttributes, linkAlternateThemeAttributes };
