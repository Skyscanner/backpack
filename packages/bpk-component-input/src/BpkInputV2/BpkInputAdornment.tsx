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

import { useContext, useEffect, useId } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import { BpkInputContext } from './BpkInputContext';

import type { BpkInputAdornmentProps } from './common-types';

import STYLES from './BpkInputV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkInputAdornment - Flexible adornment component as a flex child.
 *
 * This component renders as a regular flex child within the input-container.
 * Position (start/end) is automatically handled by flex order.
 *
 * @param {BpkInputAdornmentProps} props - Component props
 * @returns {JSX.Element} The rendered adornment element
 *
 * @example
 * ```tsx
 * <BpkInput.Root>
 *   <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
 *   <BpkInput.Input id="price" name="price" value="100" />
 * </BpkInput.Root>
 * ```
 */
const BpkInputAdornment = ({
  children,
  className,
  'data-input-adornment-id': dataInputAdornmentId,
  ...rest
}: BpkInputAdornmentProps & { 'data-child-position'?: number; 'data-adornment-type'?: 'start' | 'end' }) => {
  const context = useContext(BpkInputContext);
  const generatedId = useId();
  const adornmentId = dataInputAdornmentId || generatedId;
  const position = (rest as any)['data-child-position'] || 0;

  // Register this adornment with context
  useEffect(() => {
    context.registerAdornment(adornmentId, position);

    return () => {
      context.unregisterAdornment(adornmentId);
    };
  }, [adornmentId, position, context]);

  // Get position type from props (set by BpkInputRoot)
  const positionType = (rest as any)['data-adornment-type'] as 'start' | 'end' | undefined;

  // Build class names (keep start/end classes for styling purposes)
  const adornmentClassName = getClassName(
    'bpk-input-v2__adornment',
    context.large && 'bpk-input-v2__adornment--large',
    positionType === 'start' && 'bpk-input-v2__adornment--start',
    positionType === 'end' && 'bpk-input-v2__adornment--end',
    className
  );

  return (
    <div className={adornmentClassName} data-input-adornment-id={adornmentId}>
      {children}
    </div>
  );
};

export default BpkInputAdornment;
