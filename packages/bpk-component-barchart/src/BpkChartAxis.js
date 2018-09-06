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
import { spacingXs, lineHeightSm } from 'bpk-tokens/tokens/base.es6';
import { rtlConditionalValue } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, center, remToPx } from './utils';

import STYLES from './bpk-chart-axis.css';

const getClassName = cssModules(STYLES);

const spacing = remToPx(spacingXs);
const lineHeight = remToPx(lineHeightSm);

const getAxisConfig = ({ orientation, margin, height, width, scale }) => {
  const position = (scale.bandwidth ? center : identity)(scale.copy());

  if (orientation === ORIENTATION_X) {
    return {
      containerProps: {
        textAnchor: 'middle',
        transform: `translate(0, ${height - margin.bottom - margin.top})`,
      },
      textProps: {
        y: lineHeight,
        x: 0,
      },
      labelProps: {
        x: (width - margin.left - margin.right) / 2,
        y: margin.bottom - spacing,
      },
      tickPosition: tick => [position(tick), 0],
    };
  }

  const containerTranslateX = rtlConditionalValue(0, width - margin.right);
  const labelTranslateX = rtlConditionalValue(
    lineHeight - margin.left,
    margin.right - spacing,
  );
  const labelTranslateY = (height - margin.top - margin.bottom) / 2;

  return {
    containerProps: {
      textAnchor: 'end',
      transform: `translate(${containerTranslateX}, 0)`,
    },
    textProps: {
      y: 0,
      x: rtlConditionalValue(-1, 1) * spacing,
      dy: '0.32em',
    },
    labelProps: {
      transform: `translate(${labelTranslateX}, ${labelTranslateY}) rotate(-90)`,
    },
    tickPosition: tick => [0, position(tick)],
  };
};

const BpkChartAxis = props => {
  const {
    orientation,
    numTicks,
    tickValue,
    tickOffset,
    height,
    width,
    margin,
    scale,
    tickEvery,
    label,
    ...rest
  } = props;

  const { textProps, tickPosition, containerProps, labelProps } = getAxisConfig(
    props,
  );

  const ticks = scale.ticks
    ? scale.ticks(numTicks)
    : scale.domain().filter((tick, i) => (i - tickOffset) % tickEvery === 0);

  return (
    <g
      className={getClassName('bpk-chart__axis')}
      {...containerProps}
      {...rest}
    >
      {ticks.map((tick, i) => (
        <g
          transform={`translate(${tickPosition(tick).join(', ')})`}
          key={`${orientation}axis${i.toString()}`}
        >
          <text
            className={getClassName('bpk-chart__axis-tick-text')}
            {...textProps}
          >
            {tickValue(tick, i)}
          </text>
        </g>
      ))}
      {label && (
        <text
          className={getClassName('bpk-chart__axis-label')}
          textAnchor="middle"
          {...labelProps}
        >
          {label}
        </text>
      )}
    </g>
  );
};

BpkChartAxis.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  scale: PropTypes.func.isRequired,
  label: PropTypes.node,

  orientation: PropTypes.oneOf([ORIENTATION_X, ORIENTATION_Y]).isRequired,
  tickValue: PropTypes.func,
  numTicks: PropTypes.number,
  tickOffset: PropTypes.number,
  tickEvery: PropTypes.number,
};

BpkChartAxis.defaultProps = {
  tickOffset: 0,
  tickEvery: 1,
  tickValue: identity,
  numTicks: null,
  label: null,
};

export default BpkChartAxis;
