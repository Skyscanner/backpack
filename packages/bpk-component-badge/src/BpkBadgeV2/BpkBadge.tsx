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

import { cssModules } from '../../../bpk-react-utils';
import type { Props } from '../BpkBadge';
import { BADGE_TYPES } from '../BpkBadge'

import STYLES from './BpkBadge.module.scss';

const getClassName = cssModules(STYLES);

const badgeTypeClassNames = {
  [BADGE_TYPES.warning]: getClassName('bpk-badge--warning'),
  [BADGE_TYPES.success]: getClassName('bpk-badge--success'),
  [BADGE_TYPES.critical]: getClassName('bpk-badge--critical'),
  [BADGE_TYPES.normal]: getClassName('bpk-badge--normal'),
  [BADGE_TYPES.inverse]: getClassName('bpk-badge--inverse'),
  [BADGE_TYPES.outline]: getClassName('bpk-badge--outline'),
  [BADGE_TYPES.strong]: getClassName('bpk-badge--strong'),
  [BADGE_TYPES.brand]: getClassName('bpk-badge--brand'),
};

const BpkBadgeV2 = ({
  centered = false,
  className = null,
  docked = null,
  type = BADGE_TYPES.normal,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-badge',
    badgeTypeClassNames[type],
    docked === 'right' && 'bpk-badge--docked-right',
    docked === 'left' && 'bpk-badge--docked-left',
    centered && 'bpk-badge--centered',
    className,
  );

  return <span className={classNames} {...rest} />;
};

export default BpkBadgeV2;
