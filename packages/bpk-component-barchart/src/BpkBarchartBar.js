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

/* @flow strict */

import React from 'react';
import PropTypes from 'prop-types';
import { borderRadiusXs } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { cssModules } from '../../bpk-react-utils';

import { remToPx } from './utils';
import STYLES from './BpkBarchartBar.module.scss';

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const handleKeyboardEvent = (callback) => (event) => {
  if (event.keyCode === KEYCODES.ENTER || event.keyCode === KEYCODES.SPACEBAR) {
    event.preventDefault();
    callback(event);
  }
};

const borderRadius = remToPx(borderRadiusXs);

type Props = {
  height: number,
  label: string,
  width: number,
  x: number,
  y: number,
  className: ?string,
  onClick: ?(?any) => mixed,
  onHover: ?() => mixed,
  onFocus: ?() => mixed,
  outlier: boolean,
  padding: number,
  selected: boolean,
};

const BpkBarchartBar = (props: Props) => {
  const {
    className,
    height,
    label,
    onClick,
    onFocus,
    onHover,
    outlier,
    padding,
    selected,
    width,
    x,
    y,
    ...rest
  } = props;

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
  const tappableAreaClassNames = getClassName(
    'bpk-barchart-bar__tappable-area',
  );

  const isAriaPressed = !!(onClick && selected);
  const rectPadding = width * (padding / 2);
  const rectWidth = width * (1 - padding);

  return (
    <g className={classNames} transform={`translate(${x}, ${y})`}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
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
        onFocus={onFocus || undefined}
        onKeyDown={onClick ? handleKeyboardEvent(onClick) : undefined}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : 'graphics-symbol'}
        aria-roledescription={onClick ? undefined : 'bar'}
        aria-pressed={onClick ? isAriaPressed : undefined}
        aria-label={label}
      />
    </g>
  );
};

BpkBarchartBar.propTypes = {
  height: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onFocus: PropTypes.func,
  outlier: PropTypes.bool,
  padding: PropTypes.number,
  selected: PropTypes.bool,
};

BpkBarchartBar.defaultProps = {
  className: null,
  onClick: null,
  onHover: null,
  onFocus: null,
  outlier: false,
  padding: 0,
  selected: false,
};

export default BpkBarchartBar;
