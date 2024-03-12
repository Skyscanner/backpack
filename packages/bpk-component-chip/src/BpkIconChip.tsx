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

/*
The icon chip component is just a selectable chip that's
been hard coded to have no text or trailing icon and padding/margin
to match.
*/

import type { ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkSelectableChip from './BpkSelectableChip';
import type { CommonProps as Props } from './commonTypes';
import STYLES from './BpkSelectableChip.module.scss';

const getClassName = cssModules(STYLES);

export type BpkIconChipProps = {
  leadingAccessoryView: ReactNode;
} & Omit<Props, 'trailingAccessoryView' | 'leadingAccessoryView' | 'children'>;

const BpkIconChip = ({
                       className,
                       leadingAccessoryClassName,
                       ...rest
                     }: BpkIconChipProps) => {
  const classNames = getClassName(`bpk-chip--icon-only`, className);

  return (
    <BpkSelectableChip
      {...rest}
      className={classNames}
      leadingAccessoryClassName={getClassName(
        'bpk-chip--icon-only__leading-accessory-view',
        leadingAccessoryClassName,
      )}
      trailingAccessoryView={null}
    >
      {null}
    </BpkSelectableChip>
  );
};

export default BpkIconChip;
