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

import PropTypes from 'prop-types';
// @ts-expect-error TS(2305) FIXME: Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import {
  lineHeightSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { cssModules } from '../../bpk-react-utils';

import { rtlConditionalValue } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, center, remToPx } from './utils';

import STYLES from './BpkChartAxis.module.scss';

const getClassName = cssModules(STYLES);

const spacing = remToPx('.375rem');
const lineHeight = remToPx(lineHeightSm);

// @ts-expect-error TS(7031) FIXME: Binding element 'height' implicitly has an 'any' t... Remove this comment to see the full error message
const getAxisConfig = ({ height, margin, orientation, scale, width }) => {
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
      // @ts-expect-error TS(7006) FIXME: Parameter 'tick' implicitly has an 'any' type.
      tickPosition: (tick) => [position(tick), 0],
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
    // @ts-expect-error TS(7006) FIXME: Parameter 'tick' implicitly has an 'any' type.
    tickPosition: (tick) => [0, position(tick)],
  };
};

type Props = {
  height: number,
  width: number,
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  scale: Object,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?Node,
  orientation: string,
  // @ts-expect-error TS(2300) FIXME: Duplicate identifier 'any'.
  tickValue: (any, any) => any,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  numTicks: ?number,
  tickOffset: number,
  tickEvery: number,
};

const BpkChartAxis = (props: Props) => {
  const {
    height,
    label,
    margin,
    numTicks,
    orientation,
    scale,
    tickEvery,
    tickOffset,
    tickValue,
    width,
    ...rest
  } = props;

  const { containerProps, labelProps, textProps, tickPosition } =
    getAxisConfig(props);

  // @ts-expect-error TS(2339) FIXME: Property 'ticks' does not exist on type 'Object'.
  const ticks = scale.ticks
    // @ts-expect-error TS(2339) FIXME: Property 'ticks' does not exist on type 'Object'.
    ? scale.ticks(numTicks)
    // @ts-expect-error TS(2339) FIXME: Property 'domain' does not exist on type 'Object'.
    : scale.domain().filter((tick, i) => (i - tickOffset) % tickEvery === 0);

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <g
      className={getClassName('bpk-chart__axis')}
      aria-hidden="true"
      {...containerProps}
      {...rest}
    >
      // @ts-expect-error TS(7006): Parameter 'tick' implicitly has an 'any' type.
      // @ts-expect-error TS(7006) FIXME: Parameter 'tick' implicitly has an 'any' type.
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
