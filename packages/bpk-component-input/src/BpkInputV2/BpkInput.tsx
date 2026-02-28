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

import { useContext, useEffect, useRef } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import { BpkInputContext } from './BpkInputContext';

import type { BpkInputProps } from './common-types';

import STYLES from './BpkInputV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkInput - Input element as a flex child within input-container.
 *
 * This component integrates with BpkInputRoot context to apply large variant.
 * Border and validation styles are applied at the container level.
 *
 * @param {BpkInputProps} props - Component props
 * @returns {JSX.Element} The rendered input element
 *
 * @example
 * ```tsx
 * <BpkInput.Root>
 *   <BpkInput.Input id="username" name="username" value="john" />
 * </BpkInput.Root>
 * ```
 */
const BpkInput = ({
  className,
  clearButtonLabel,
  clearButtonMode,
  id,
  inputRef,
  name,
  onClear,
  type = 'text',
  valid = null,
  value,
  ...rest
}: BpkInputProps) => {
  const context = useContext(BpkInputContext);
  const internalRef = useRef<HTMLInputElement>(null);

  // Register this input with context
  useEffect(() => {
    context.registerInput(id, internalRef);

    return () => {
      context.unregisterInput(id);
    };
  }, [id, context]);

  // Handle ref forwarding
  useEffect(() => {
    if (inputRef && internalRef.current) {
      inputRef(internalRef.current);
    }
  }, [inputRef]);

  // Build class names (validation and docked styles now on container)
  let inputClassName = getClassName(
    'bpk-input-v2__input',
    context.large && 'bpk-input-v2__input--large'
  );

  if (className) {
    inputClassName = getClassName(inputClassName, className);
  }

  return (
    <input
      ref={internalRef}
      id={id}
      name={name}
      value={value}
      type={type}
      className={inputClassName}
      aria-invalid={valid === false ? 'true' : undefined}
      {...rest}
    />
  );
};

export default BpkInput;
