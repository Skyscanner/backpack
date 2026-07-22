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

import type { FocusEventHandler, KeyboardEvent, MouseEvent, SVGProps } from 'react';

import { borderRadiusXs } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { cssModules } from '../../bpk-react-utils';

import { remToPx } from './utils';

import STYLES from './BpkBarchartBar.module.scss';

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const handleKeyboardEvent =
  (callback: (event: MouseEvent<SVGRectElement>) => void) =>
  (event: KeyboardEvent<SVGRectElement>) => {
    if (event.keyCode === KEYCODES.ENTER || event.keyCode === KEYCODES.SPACEBAR) {
      event.preventDefault();
      callback(event as unknown as MouseEvent<SVGRectElement>);
    }
  };

const borderRadius = remToPx(borderRadiusXs);

type Props = Omit<SVGProps<SVGRectElement>, 'x' | 'y' | 'width' | 'height' | 'onClick' | 'onFocus' | 'onMouseOver'> & {
  height: number;
  label?: string | null;
  width: number;
  x: number;
  y: number;
  className?: string | undefined;
  onClick?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  onHover?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  onFocus?: ((event: MouseEvent<SVGRectElement>) => void) | undefined;
  outlier?: boolean;
  padding?: number;
  selected?: boolean;
};

const BpkBarchartBar = ({
  className = undefined,
  height,
  label,
  onClick = undefined,
  onFocus = undefined,
  onHover = undefined,
  outlier = false,
  padding = 0,
  selected = false,
  width,
  x,
  y,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-barchart-bar',
    className,
    selected && 'bpk-barchart-bar--selected',
    (onClick || onHover) && 'bpk-barchart-bar--interactive',
  );
  const rectClassNames = getClassName(
    'bpk-barchart-bar__rect',
    outlier && 'bpk-barchart-bar__rect--outlier',
  );
  const tappableAreaClassNames = getClassName('bpk-barchart-bar__tappable-area');

  const isAriaPressed = !!(onClick && selected);
  const rectPadding = width * (padding / 2);
  const rectWidth = width * (1 - padding);

  return (
    <g className={classNames} transform={`translate(${x}, ${y})`}>
      <rect
        className={rectClassNames}
        x={rectPadding}
        y={0}
        width={rectWidth}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        {...rest}
      />
      <rect
        className={tappableAreaClassNames}
        x={0}
        y={0}
        width={width}
        height={height}
        onClick={onClick || undefined}
        onMouseOver={onHover || undefined}
        onFocus={onFocus as unknown as FocusEventHandler<SVGRectElement> | undefined}
        onKeyDown={onClick ? handleKeyboardEvent(onClick) : undefined}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : 'graphics-symbol'}
        aria-roledescription={onClick ? undefined : 'bar'}
        aria-pressed={onClick ? isAriaPressed : undefined}
        aria-label={label ?? undefined}
      />
    </g>
  );
};

export default BpkBarchartBar;
