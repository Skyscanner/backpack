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

import type { ReactNode, SVGProps } from 'react';

import { lineHeightSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { cssModules } from '../../bpk-react-utils';

import { rtlConditionalValue } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, center, remToPx } from './utils';

import type { Margin, Orientation, Scale } from './common-types';

import STYLES from './BpkChartAxis.module.scss';

const getClassName = cssModules(STYLES);

const spacing = remToPx('.375rem');
const lineHeight = remToPx(lineHeightSm);

type AxisConfig = {
  containerProps: {
    textAnchor: string;
    transform: string;
  };
  textProps: {
    y: number;
    x: number;
    dy?: string;
  };
  labelProps: {
    x?: number;
    y?: number;
    transform?: string;
  };
  tickPosition: (tick: any) => [number, number];
};

const getAxisConfig = ({
  height,
  margin,
  orientation,
  scale,
  width,
}: {
  height: number;
  margin: Margin;
  orientation: Orientation;
  scale: Scale;
  width: number;
}): AxisConfig => {
  const position = scale.bandwidth ? center(scale) : identity;

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
    tickPosition: (tick) => [0, position(tick)],
  };
};

type Props = Omit<SVGProps<SVGGElement>, 'transform' | 'scale'> & {
  height: number;
  width: number;
  margin: Margin;
  scale: Scale;
  label?: ReactNode | null;
  orientation: Orientation;
  tickValue?: (tick: any, index: number) => ReactNode;
  numTicks?: number | null;
  tickOffset?: number;
  tickEvery?: number;
};

const BpkChartAxis = ({
  height,
  label = null,
  margin,
  numTicks = null,
  orientation,
  scale,
  tickEvery = 1,
  tickOffset = 0,
  tickValue = identity,
  width,
  ...rest
}: Props) => {
  const { containerProps, labelProps, textProps, tickPosition } =
    getAxisConfig({ height, margin, orientation, scale, width });

  const ticks = scale.ticks
    ? scale.ticks(numTicks ?? undefined)
    : (scale.domain() as unknown[]).filter(
        (_tick, i) => (i - tickOffset) % tickEvery === 0,
      );

  return (
    <g
      className={getClassName('bpk-chart__axis')}
      aria-hidden="true"
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

export default BpkChartAxis;
