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

import type { SVGProps } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { ORIENTATION_X } from './orientation';
import { identity, center } from './utils';

import type { Margin, Orientation, Scale } from './common-types';

import STYLES from './BpkChartGridLines.module.scss';

const getClassName = cssModules(STYLES);

type Props = Omit<SVGProps<SVGGElement>, 'scale'> & {
  width: number;
  height: number;
  margin: Margin;
  scale: Scale;
  orientation: Orientation;
  numTicks?: number | undefined;
  tickOffset?: number;
  tickEvery?: number;
};

const BpkChartGridLines = ({
  height,
  margin,
  numTicks = undefined,
  orientation,
  scale,
  tickEvery = 1,
  tickOffset = 0,
  width,
  ...rest
}: Props) => {
  const ticks: unknown[] =
    'ticks' in scale
      ? scale.ticks(numTicks ?? undefined)
      : (scale.domain() as unknown[]).filter(
          (_tick, i) => (i - tickOffset) % tickEvery === 0,
        );
  const position =
    'bandwidth' in scale
      ? center(scale)
      : (tick: unknown) => scale(tick as number);

  const lineProps = (tick: any) => {
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

  const toLine = (tick: any, i: number) => (
    <line
      className={getClassName('bpk-chart__grid-line')}
      key={`${orientation}gridline${i.toString()}`}
      {...lineProps(tick)}
      {...(rest as SVGProps<SVGLineElement>)}
    />
  );

  return (
    <g className={getClassName('bpk-chart__grid-lines')}>{ticks.map(toLine)}</g>
  );
};

export default BpkChartGridLines;
