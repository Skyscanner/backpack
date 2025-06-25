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

// TODO: remove this once we update the Chart implementation to accept values
// other than pixels
 

import { render } from '@testing-library/react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'd3-s... Remove this comment to see the full error message
import { scaleLinear, scaleBand } from 'd3-scale';

import BpkChartAxis from './BpkChartAxis';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';

const margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
};

const size = 200;
const linearScale = scaleLinear().domain([5, 480]).range([0, size]);
const bandScale = scaleBand()
  .domain([
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Australia',
    'Antartica',
  ])
  .range([0, size]);

describe('BpkChartAxis', () => {
  describe('X', () => {
    it('should render linear scale', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_X}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render linear scale with "numTicks" attribute', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_X}
            numTicks={2}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_X}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" attribute', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_X}
            tickEvery={2}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" and "tickOffset" attributes', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_X}
            tickEvery={2}
            tickOffset={1}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with label', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_X}
            label="X axis label"
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Y', () => {
    it('should render linear scale', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_Y}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render linear scale with "numTicks" attribute', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_Y}
            numTicks={2}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_Y}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" attribute', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_Y}
            tickEvery={2}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" and "tickOffset" attributes', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={bandScale}
            orientation={ORIENTATION_Y}
            tickEvery={2}
            tickOffset={1}
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with label', () => {
      const { asFragment } = render(
        <svg>
          <BpkChartAxis
            width={size}
            height={size}
            margin={margin}
            scale={linearScale}
            orientation={ORIENTATION_Y}
            label="Y axis label"
          />
        </svg>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
