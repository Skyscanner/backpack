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
// @ts-nocheck

import type { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { withRtlSupport } from '../../bpk-component-icon';
import AirportsIconSm from '../../bpk-component-icon/sm/airports';

import BpkPriceMarker from './BpkPriceMarker';
import BpkPriceMarkerButton from './BpkPriceMarkerButton';


const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);

type Props = {
  children: ReactNode;
};

jest.mock('@react-google-maps/api', () => ({
  OverlayView: (props: Props) => (
    <div>
      <div className="mock-overlay-view" />
      {}
      {props.children}
    </div>
  ),
}));

describe('BpkPriceMarke accessibility tests', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };

  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        accessibilityLabel="Click the price marker"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkPriceMarkerButton accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkPriceMarkerButton label="£120" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when have icon', async () => {
    const { container } = render(
      <BpkPriceMarkerButton label="£120" icon={<AlignedAirportsIconSm />} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
