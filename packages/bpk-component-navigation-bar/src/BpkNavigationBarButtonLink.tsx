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

import BpkLink, { type BpkLinkProps } from '../../bpk-component-link';
import { getDataComponentAttribute } from '../../bpk-react-utils';

import { BAR_STYLES, type BarStyle } from './BpkNavigationBar';

export interface Props extends Omit<BpkLinkProps<'button'>, 'as'> {
  /** Additional CSS class(es) to apply to the wrapper span. */
  className?: string;
  /** The bar style to determine link color variant. */
  barStyle?: BarStyle;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
}

const BpkNavigationBarButtonLink = ({
  barStyle = BAR_STYLES.default,
  children,
  className,
  ...rest
}: Props) => (
  <span className={className} {...getDataComponentAttribute('NavigationBarButtonLink')}>
    <BpkLink
      as="button"
      alternate={barStyle === BAR_STYLES.onDark}
      {...rest}
    >
      {children}
    </BpkLink>
  </span>
);

export default BpkNavigationBarButtonLink;