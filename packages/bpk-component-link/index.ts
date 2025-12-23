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
import BpkLink, {
  LINK_AS,
  type LinkAs,
  type Props as BpkLinkProps,
  type BpkLinkProps as BpkLinkPolymorphicProps,
} from './src/BpkLink';
import themeAttributes, {
  linkAlternateThemeAttributes,
} from './src/themeAttributes';

/**
 * @deprecated Use BpkLinkPolymorphicProps for polymorphic usage
 */
export type { BpkButtonLinkProps };
export type { BpkLinkProps, LinkAs };
/** Generic polymorphic props type */
export type { BpkLinkPolymorphicProps };
export default BpkLink;
export { BpkButtonLink, LINK_AS, themeAttributes, linkAlternateThemeAttributes };
