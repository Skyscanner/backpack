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

import type { AriaAttributes, ReactNode } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkProgressRing.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Size variants for the progress ring
 */
export const PROGRESS_RING_SIZES = {
  small: 'small',
  default: 'default',
  large: 'large',
} as const;

export type ProgressRingSize = keyof typeof PROGRESS_RING_SIZES;

export interface BpkProgressRingProps extends AriaAttributes {
  /**
   * Progress value between 0 and 100
   */
  value: number;
  /**
   * Maximum value for the progress (defaults to 100)
   */
  max?: number;
  /**
   * Size of the progress ring
   */
  size?: ProgressRingSize;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Content to display in the center of the ring
   */
  children?: ReactNode;
  /**
   * Accessibility label for the progress ring
   */
  'aria-label'?: string;
  /**
   * ID of an element that describes the progress ring
   */
  'aria-describedby'?: string;
}

/**
 * BpkProgressRing component for displaying circular progress indicators.
 * 
 * @param props - The component props
 * @returns A circular progress ring component
 */
const BpkProgressRing = ({
  value,
  max = 100,
  size = PROGRESS_RING_SIZES.default,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: BpkProgressRingProps) => {
  // Ensure value is within bounds
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;
  
  // Calculate stroke-dasharray for the progress circle
  const radius = 45; // Base radius for calculations
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const classNames = getClassName(
    'bpk-progress-ring',
    `bpk-progress-ring--${size}`,
    className
  );

  return (
    <div className={classNames} {...rest}>
      <svg
        className={getClassName('bpk-progress-ring__svg')}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          className={getClassName('bpk-progress-ring__background')}
          cx="50"
          cy="50"
          r={radius}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          className={getClassName('bpk-progress-ring__progress')}
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)" // Start from top
        />
      </svg>
      
      {children && (
        <div className={getClassName('bpk-progress-ring__content')}>
          {children}
        </div>
      )}
    </div>
  );
};

export default BpkProgressRing;