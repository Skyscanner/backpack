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

import type { ChangeEvent } from 'react';

import { cssModules } from '../../../../bpk-react-utils';

import { useCheckboxCardContext } from './CheckboxCardContext';

import STYLES from '../BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxCard.Control - Hidden checkbox input element
 *
 * This component renders the actual checkbox input that maintains the form state.
 * It is visually hidden but remains accessible to screen readers and keyboard navigation.
 *
 * The control automatically connects to the parent Root component via Context,
 * inheriting checked state, disabled state, and other properties.
 *
 * @example
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>Option</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @returns {JSX.Element} Rendered hidden checkbox input control.
 */
export default function Control() {
  const {
    checked,
    controlId,
    descriptionId,
    disabled,
    labelId,
    name,
    onCheckedChange,
    value,
  } = useCheckboxCardContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(event.target.checked);
  };

  const className = getClassName('bpk-checkbox-card-control');

  return (
    <input
      id={controlId}
      type="checkbox"
      className={className}
      checked={checked}
      disabled={disabled}
      name={name}
      value={value}
      onChange={handleChange}
      aria-checked={checked}
      aria-disabled={disabled}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      tabIndex={-1} // Focus is handled by the root container
    />
  );
}
