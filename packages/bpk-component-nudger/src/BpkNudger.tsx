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
import BpkLabel from '../../bpk-component-label';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkConfigurableNudger from './BpkConfigurableNudger';
import { type CommonProps } from './common-types';

import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);
const compareValues = (a: number, b: number): number => a - b;
const incrementValue = (currentValue: number): number => currentValue + 1;
const decrementValue = (currentValue: number): number => currentValue - 1;
const formatValue = (currentValue: number): string => currentValue.toString();

const BpkNudger = ({
  buttonType = 'secondary',
  className = null,
  icon,
  id,
  subtitle,
  title,
  ...rest
}: CommonProps) => {
  const classNames = getClassName(title && 'bpk-nudger__container');

  return (
    <div className={classNames}>
      {title && (
        <div className={getClassName('bpk-nudger__label')}>
          <BpkLabel htmlFor={id}>
            {icon}
          </BpkLabel>
          <span
            // For a11y on IOS, role='text' forces label to be read in full. More info: https://axesslab.com/text-splitting/
            // eslint-disable-next-line jsx-a11y/aria-role
            role="text"
            className={getClassName('bpk-nudger__label--title-subtitle')}
          >
            <BpkText textStyle={TEXT_STYLES.heading5}>{title}</BpkText>
            {subtitle && (
              <span className={getClassName('bpk-nudger__label--subtitle')}>
                <BpkText>
                  {subtitle}
                </BpkText>
              </span>
            )}
          </span>
        </div>
      )}
      <BpkConfigurableNudger
        valueClassName={getClassName('bpk-nudger__value--numeric')}
        compareValues={compareValues}
        incrementValue={incrementValue}
        decrementValue={decrementValue}
        formatValue={formatValue}
        // TODO: className to be removed
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={className}
        buttonType={buttonType}
        id={id}
        {...rest}
      />
    </div>
  )};

export default BpkNudger;
