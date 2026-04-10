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

import type { MouseEvent } from 'react';

import ThumbsDownIconLg from '../../bpk-component-icon/lg/thumbs-down';
import ThumbsUpIconLg from '../../bpk-component-icon/lg/thumbs-up';
import ThumbsDownIconSm from '../../bpk-component-icon/sm/thumbs-down';
import ThumbsUpIconSm from '../../bpk-component-icon/sm/thumbs-up';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkThumbButton.module.scss';

const getClassName = cssModules(STYLES);


export type ThumbsButtonType = 'up' | 'down';
export type ThumbsButtonSize = 'default' | 'small';
export type ThumbsButtonColor = 'default' | 'primary';

export type BpkThumbButtonProps = {
  /**
   * Accessibility label for screen readers (REQUIRED).
   */
  accessibilityLabel: string;
  /**
   * Icon color variant. 'primary' uses the primary text color, 'default' uses the disabled text color (grayish).
   */
  iconColor?: ThumbsButtonColor;
  /**
   * Click handler callback.
   */
  onClick: (type: ThumbsButtonType) => void;
  /**
   * Whether the thumb is in selected state.
   */
  selected?: boolean;
  /**
   * Size variant. 'small' uses sm icons with no fixed dimensions, matching inline text use cases.
   */
  size?: ThumbsButtonSize;
  /**
   * Type of thumb icon to display.
   */
  type: ThumbsButtonType;
};

const BpkThumbButton = ({
  accessibilityLabel,
  iconColor = 'default',
  onClick,
  selected = false,
  size = 'default',
  type,
}: BpkThumbButtonProps) => {

  const icons = {
    small: { up: ThumbsUpIconSm, down: ThumbsDownIconSm },
    default: { up: ThumbsUpIconLg, down: ThumbsDownIconLg },
  };
  const Icon = icons[size][type];

  const classNames = getClassName(
    'bpk-thumb-button',
    selected && 'bpk-thumb-button--selected',
    size === 'small' && 'bpk-thumb-button--small',
    iconColor === 'primary' && 'bpk-thumb-button--color-primary',
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick(type);
  };

  const iconClassNames = getClassName('bpk-thumb-button__icon');

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      aria-label={accessibilityLabel}
      aria-pressed={selected}
      data-testid={`bpk-thumb-button-${type}`}
      {...getDataComponentAttribute('ThumbButton')}
    >
      <span className={iconClassNames}>
        <Icon />
      </span>
    </button>
  );
};

export default BpkThumbButton;
