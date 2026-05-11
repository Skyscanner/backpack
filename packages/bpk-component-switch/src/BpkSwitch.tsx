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

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkSwitch.module.scss';

export const SWITCH_TYPES = {
  default: 'default',
  onContrast: 'onContrast',
} as const;

export type SwitchType = (typeof SWITCH_TYPES)[keyof typeof SWITCH_TYPES];

const getClassName = cssModules(STYLES);

const switchTypeClassNames = {
  [SWITCH_TYPES.default]: null,
  [SWITCH_TYPES.onContrast]: getClassName('bpk-switch__switch--on-contrast'),
};

export type Props = {
  ariaLabel: string;
  className?: string | null;
  small?: boolean;
  type?: SwitchType;
  [rest: string]: any;
};

const BpkSwitch = ({
  ariaLabel,
  className = null,
  small = false,
  type = SWITCH_TYPES.default,
  ...rest
}: Props) => {
  const switchClassNames = getClassName(
    'bpk-switch__switch',
    small && 'bpk-switch__switch--small',
    switchTypeClassNames[type],
  );

  return (
    <label className={getClassName('bpk-switch', className)} {...getDataComponentAttribute('Switch')}>
      <input
        type="checkbox"
        className={getClassName('bpk-switch__checkbox')}
        aria-label={ariaLabel}
        {...rest}
      />
      <span aria-hidden className={switchClassNames} />
    </label>
  );
};

export default BpkSwitch;