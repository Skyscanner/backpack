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

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';

import { cssModules } from '../../../../bpk-react-utils';

import STYLES from './BpkInputGroup.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Props for BpkInputGroup component
 */
export type BpkInputGroupProps = {
  /**
   * The input element to be wrapped. Must be a single child element, typically a BpkInputV2 component.
   * Multiple children are not allowed.
   */
  children: ReactElement;
  /**
   * Optional element to display at the start (left in LTR, right in RTL) of the input.
   * Examples: currency symbol ($), icon, or label text.
   */
  startElement?: ReactNode;
  /**
   * Optional element to display at the end (right in LTR, left in RTL) of the input.
   * Examples: unit label (USD), icon, or button.
   */
  endElement?: ReactNode;
  /**
   * Optional CSS class name to apply to the container.
   */
  className?: string;
};

/**
 * BpkInputGroup is a container component that positions decorative elements
 * (such as currency symbols, icons, or unit labels) at the start or end of an input field.
 *
 * This component works seamlessly with BpkInputV2 and maintains proper RTL support
 * and accessibility by marking decorative elements as aria-hidden.
 *
 * @param {BpkInputGroupProps} props - The component props
 * @returns {ReactElement} The rendered input group component
 *
 * @example
 * ```tsx
 * <BpkInputGroup startElement={<span>$</span>}>
 *   <BpkInputV2 id="price" name="price" value={price} onChange={handleChange} />
 * </BpkInputGroup>
 * ```
 */
const BpkInputGroup = ({
  children,
  className,
  endElement,
  startElement,
}: BpkInputGroupProps) => {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState(0);
  const [endWidth, setEndWidth] = useState(0);

  // Measure element widths on mount and when elements change
  useEffect(() => {
    if (startElement && startRef.current) {
      setStartWidth(startRef.current.offsetWidth / 2);
    }
  }, [startElement]);

  useEffect(() => {
    if (endElement && endRef.current) {
      setEndWidth(endRef.current.offsetWidth / 2);
    }
  }, [endElement]);

  const classNames = [getClassName('bpk-input-group')];

  if (startElement) {
    classNames.push(getClassName('bpk-input-group--with-start'));
  }

  if (endElement) {
    classNames.push(getClassName('bpk-input-group--with-end'));
  }

  if (className) {
    classNames.push(className);
  }

  // Create inline styles with CSS variables for dynamic widths
  const containerStyle = {
    '--start-element-width': `${startWidth}px`,
    '--end-element-width': `${endWidth}px`,
  } as CSSProperties;

  return (
    <div className={classNames.join(' ')} style={containerStyle}>
      {startElement && (
        <div
          ref={startRef}
          className={getClassName('bpk-input-group__start')}
          aria-hidden="true"
        >
          {startElement}
        </div>
      )}
      {children}
      {endElement && (
        <div
          ref={endRef}
          className={getClassName('bpk-input-group__end')}
          aria-hidden="true"
        >
          {endElement}
        </div>
      )}
    </div>
  );
};

BpkInputGroup.displayName = 'BpkInputGroup';

export default BpkInputGroup;

