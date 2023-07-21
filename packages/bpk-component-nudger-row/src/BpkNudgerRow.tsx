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

import { cssModules } from '../../bpk-react-utils';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import BpkNudger from '../../bpk-component-nudger';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLabel from '../../bpk-component-label';

import STYLES from './BpkNudgerRow.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  title: string;
  nudgerId: string;
  value: number;
  decreaseButtonLabel: string;
  increaseButtonLabel: string;
  min: number;
  max: number;
  onChange: (arg0: any) => null | void;
  subtitle?: string;
  className?: string | null;
};
const BpkNudgerRow = ({
  className = null,
  decreaseButtonLabel,
  increaseButtonLabel,
  max,
  min,
  nudgerId,
  onChange,
  subtitle,
  title,
  value,
}: Props) => {
  const classNames = getClassName('bpk-nudger-row', className);

  return (
    <div className={classNames}>
      <BpkLabel htmlFor={nudgerId}>
        <span
          // For a11y on IOS, role='text' forces label to be read in full. More info: https://axesslab.com/text-splitting/
          // eslint-disable-next-line jsx-a11y/aria-role
          role="text"
          className={getClassName('bpk-nudger-row__title-subtitle')}
        >
          <BpkText textStyle={TEXT_STYLES.heading5}>{title}</BpkText>
          {subtitle && (
            <BpkText className={getClassName('bpk-nudger-row__subtitle')}>
              {subtitle}
            </BpkText>
          )}
        </span>
      </BpkLabel>
      <BpkNudger
        id={nudgerId}
        decreaseButtonLabel={decreaseButtonLabel}
        increaseButtonLabel={increaseButtonLabel}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default BpkNudgerRow;
