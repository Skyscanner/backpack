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

import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { useState } from 'react';

import { withButtonAlignment } from '../../bpk-component-icon';
import ThumbsDownIcon from '../../bpk-component-icon/lg/thumbs-down';
import ThumbsUpIcon from '../../bpk-component-icon/lg/thumbs-up';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkThumb.module.scss';

const getClassName = cssModules(STYLES);

const AlignedThumbsUpIcon = withButtonAlignment(ThumbsUpIcon);
const AlignedThumbsDownIcon = withButtonAlignment(ThumbsDownIcon);

export type ThumbsType = 'up' | 'down';

export type BpkThumbProps = {
  /**
   * Accessibility label for screen readers (REQUIRED).
   */
  accessibilityLabel: string;
  /**
   * Click handler callback.
   */
  onClick?: (type: ThumbsType) => void;
  /**
   * Whether the thumb is in selected state.
   */
  selected?: boolean;
  /**
   * Type of thumb icon to display.
   */
  type: ThumbsType;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className' | 'onClick' | 'style' | 'type'>;

const BpkThumb = ({
  accessibilityLabel,
  onClick,
  selected = false,
  type,
  ...rest
}: BpkThumbProps) => {
  const [hovered, setHovered] = useState(false);

  const Icon = type === 'up' ? AlignedThumbsUpIcon : AlignedThumbsDownIcon;

  const classNames = getClassName(
    'bpk-thumb',
    selected && 'bpk-thumb--selected',
    hovered && 'bpk-thumb--hovered',
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClick?.(type);
  };

  const iconClassNames = getClassName('bpk-thumb__icon');

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={accessibilityLabel}
      title={accessibilityLabel}
      data-testid={`bpk-thumb-${type}`}
      {...rest}
    >
      <span className={iconClassNames}>
        <Icon />
      </span>
    </button>
  );
};

export default BpkThumb;
