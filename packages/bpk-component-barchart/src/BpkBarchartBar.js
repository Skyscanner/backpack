/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import { borderRadiusXs } from 'bpk-tokens/tokens/base.es6';
import { remToPx } from './utils';

import STYLES from './bpk-barchart-bar.css';

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const handleKeyboardEvent = callback => event => {
  if (event.keyCode === KEYCODES.ENTER || event.keyCode === KEYCODES.SPACEBAR) {
    event.preventDefault();
    callback(event);
  }
};

const borderRadius = remToPx(borderRadiusXs);

const BpkBarchartBar = props => {
  const {
    x,
    y,
    width,
    height,
    className,
    label,
    onClick,
    onHover,
    onFocus,
    outlier,
    selected,
    padding,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-barchart-bar')];
  const rectClassNames = [getClassName('bpk-barchart-bar__rect')];
  const tappableAreaClassNames = [
    getClassName('bpk-barchart-bar__tappable-area'),
  ];

  if (className) {
    classNames.push(className);
  }
  if (selected) {
    classNames.push(getClassName('bpk-barchart-bar--selected'));
  }
  if (onClick || onHover) {
    classNames.push(getClassName('bpk-barchart-bar--interactive'));
  }
  if (outlier) {
    rectClassNames.push(getClassName('bpk-barchart-bar__rect--outlier'));
  }

  const isAriaPressed = !!(onClick && selected);
  const rectPadding = width * (padding / 2);
  const rectWidth = width * (1 - padding);

  return (
    <g className={classNames.join(' ')} transform={`translate(${x}, ${y})`}>
      <title>{label}</title>
      <rect
        className={rectClassNames.join(' ')}
        x={rectPadding}
        y={0}
        width={rectWidth}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        {...rest}
      />
      <rect
        className={tappableAreaClassNames.join(' ')}
        x={0}
        y={0}
        width={width}
        height={height}
        onClick={onClick || undefined}
        onMouseOver={onHover || undefined}
        onFocus={onFocus || undefined}
        onKeyDown={onClick ? handleKeyboardEvent(onClick) : undefined}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        aria-pressed={isAriaPressed}
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
