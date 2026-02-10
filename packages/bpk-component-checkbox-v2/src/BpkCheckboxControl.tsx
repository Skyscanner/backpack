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

import { Checkbox } from '@ark-ui/react/checkbox';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

const CheckmarkIcon = () => (
  <svg
    width="13"
    height="9"
    viewBox="0 0 13 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.35352 3.64648L5.5 7.5L11.5 1.5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="10"
    height="3"
    viewBox="0 0 10 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10"
      height="3"
      rx="1.5"
      fill="currentColor"
    />
  </svg>
);

export type BpkCheckboxControlProps = {
  className?: string | null;
};

const BpkCheckboxControl = ({
  className = null,
}: BpkCheckboxControlProps) => (
  <div className={getClassName('bpk-checkbox__control-wrapper')}>
    <Checkbox.Control className={getClassName('bpk-checkbox__control', className)}>
      <Checkbox.Indicator className={getClassName('bpk-checkbox__indicator')}>
        <CheckmarkIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator className={getClassName('bpk-checkbox__indicator')} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
  </div>
);

export default BpkCheckboxControl;
