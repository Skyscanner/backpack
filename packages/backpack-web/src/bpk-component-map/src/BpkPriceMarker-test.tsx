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

import type { ReactNode } from 'react';

import { render } from '@testing-library/react';

import BpkPriceMarker from './BpkPriceMarker';
import { MARKER_STATUSES } from './BpkPriceMarkerButton';


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

describe('BpkPriceMarker', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };

  it('should render properly', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with a icon', () => {
    const icon = <span>Icon</span>;
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        icon={icon}
        position={position}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "selected"', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        status={MARKER_STATUSES.selected}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "previous_selected"', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        status={MARKER_STATUSES.previous_selected}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        className="custom-class-1 custom-class-2"
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "buttonProps" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        buttonProps={{ testId: 'arbitrary value' }}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "onClick" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarker
        label="£120"
        position={position}
        onClick={() => {
          alert('Marker clicked'); // eslint-disable-line no-alert
        }}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
