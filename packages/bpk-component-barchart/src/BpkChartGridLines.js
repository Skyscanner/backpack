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

import { cssModules } from '../../bpk-react-utils';

import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, center } from './utils';
import STYLES from './BpkChartGridLines.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  width: number,
  height: number,
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  scale: Object,
  orientation: string,
  numTicks: ?number,
  tickOffset: number,
  tickEvery: number,
};

const BpkChartGridLines = (props: Props) => {
  const {
    height,
    margin,
    numTicks,
    orientation,
    scale,
    tickEvery,
    tickOffset,
    width,
    ...rest
  } = props;

  const ticks = scale.ticks
    ? scale.ticks(numTicks)
    : scale.domain().filter((tick, i) => (i - tickOffset) % tickEvery === 0);
  const position = (scale.bandwidth ? center : identity)(scale.copy());

  const lineProps = (tick) => {
    const value = position(tick);
    return orientation === ORIENTATION_X
      ? {
          x1: value,
          x2: value,
          y2: height - margin.top - margin.bottom,
        }
      : {
          x2: width - margin.left - margin.right,
          y1: value,
          y2: value,
        };
  };

  const toLine = (tick, i) => (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <line
      className={getClassName('bpk-chart__grid-line')}
      key={`${orientation}gridline${i.toString()}`}
      {...lineProps(tick)}
      {...rest}
    />
  );

  return (
    <g className={getClassName('bpk-chart__grid-lines')}>{ticks.map(toLine)}</g>
  );
};

BpkChartGridLines.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,

  scale: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf([ORIENTATION_X, ORIENTATION_Y]).isRequired,
  numTicks: PropTypes.number,
  tickOffset: PropTypes.number,
  tickEvery: PropTypes.number,
};

BpkChartGridLines.defaultProps = {
  numTicks: null,
  tickOffset: 0,
  tickEvery: 1,
};

export default BpkChartGridLines;
