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

import { cssModules } from '../../../../bpk-react-utils';

import { useCheckboxCardContext } from './CheckboxCardContext';

import STYLES from '../BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxCard.Control - Hidden checkbox input for form submission
 *
 * This component renders a hidden checkbox input that maintains form state.
 * Accessibility (role, aria-checked, keyboard) is handled by the Root div.
 * The input is aria-hidden so screen readers interact with the Root instead.
 *
 * @returns {JSX.Element} Rendered hidden checkbox input control.
 */
export default function Control() {
  const {
    checked,
    disabled,
    name,
    required,
    value,
  } = useCheckboxCardContext();

  const className = getClassName('bpk-checkbox-card-control');

  return (
    <input
      type="checkbox"
      className={className}
      checked={checked}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      aria-hidden
      tabIndex={-1}
      onChange={() => {}}
    />
  );
}
