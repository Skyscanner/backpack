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

import BpkCheckboxControl from './BpkCheckboxControl';
import BpkCheckboxHiddenInput from './BpkCheckboxHiddenInput';
import BpkCheckboxIndicator from './BpkCheckboxIndicator';
import BpkCheckboxLabel from './BpkCheckboxLabel';
import BpkCheckboxRoot from './BpkCheckboxRoot';

import type { BpkCheckboxProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckbox is a checkbox component built on Ark UI primitives.
 *
 * It supports two modes:
 * 1. Simple mode: Use with `label` prop for quick implementation
 * 2. Composable mode: Use with sub-components for custom layouts
 *
 * @param {BpkCheckboxProps} props - Component props
 * @returns {JSX.Element} The rendered checkbox component
 *
 * @example
 * // Simple mode (legacy API)
 * <BpkCheckbox name="accept" label="I accept the terms" checked={checked} onChange={handleChange} />
 *
 * @example
 * // Composable mode (new API)
 * <BpkCheckbox name="accept" checked={checked} onChange={handleChange}>
 *   <BpkCheckbox.Control />
 *   <BpkCheckbox.Label>I accept the terms</BpkCheckbox.Label>
 *   <BpkCheckbox.HiddenInput />
 * </BpkCheckbox>
 */
const BpkCheckbox = (props: BpkCheckboxProps) => {
  // Type guard to check if using simple API (has label prop)
  const isSimpleMode = 'label' in props && props.label !== undefined;

  if (isSimpleMode) {
    // Simple mode: render with auto-generated sub-components
    const {
      disabled = false,
      label,
      required = false,
      smallLabel = false,
      ...rootProps
    } = props;

    const labelClassNames = getClassName(
      'bpk-checkbox__label',
      smallLabel && 'bpk-checkbox__label--small',
    );

    return (
      <BpkCheckboxRoot {...rootProps} disabled={disabled}>
        <BpkCheckboxControl>
          <BpkCheckboxIndicator />
        </BpkCheckboxControl>
        <BpkCheckboxLabel
          {...(labelClassNames ? { className: labelClassNames } : {})}
        >
          {label}
          {!disabled && required && (
            <span className={getClassName('bpk-checkbox__asterisk')}>*</span>
          )}
        </BpkCheckboxLabel>
        <BpkCheckboxHiddenInput />
      </BpkCheckboxRoot>
    );
  }

  // Composable mode: render root with user-provided children
  return <BpkCheckboxRoot {...(props as any)} />;
};

// Attach sub-components as properties
BpkCheckbox.Root = BpkCheckboxRoot;
BpkCheckbox.Control = BpkCheckboxControl;
BpkCheckbox.Label = BpkCheckboxLabel;
BpkCheckbox.Indicator = BpkCheckboxIndicator;
BpkCheckbox.HiddenInput = BpkCheckboxHiddenInput;

export default BpkCheckbox;

// Export sub-components individually
export {
  BpkCheckboxRoot,
  BpkCheckboxControl,
  BpkCheckboxLabel,
  BpkCheckboxIndicator,
  BpkCheckboxHiddenInput,
};
