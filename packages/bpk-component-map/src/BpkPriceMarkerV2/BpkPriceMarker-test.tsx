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

import { render } from '@testing-library/react';

import BpkPriceMarkerV2, { PRICE_MARKER_STATUSES } from './BpkPriceMarker';

type Props = {
  children: Node,
};

jest.mock('@react-google-maps/api', () => ({
  OverlayView: (props: Props) => (
    <div>
      <div className="mock-overlay-view" />
      { }
      {props.children}
    </div>
  ),
}));

describe('BpkMapMarker', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };

  it('should render properly', () => {
    const { asFragment } = render(
      <BpkPriceMarkerV2 label="£120" position={position}   accessibilityLabel="Click the price marker" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with a icon', () => {
    const icon = <span>Icon</span>;
    const { asFragment } = render(
      <BpkPriceMarkerV2 label={icon} position={position} accessibilityLabel="Click the price marker"/>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "focused"', () => {
    const { asFragment } = render(
      <BpkPriceMarkerV2
        label="£120"
        position={position}
        status={PRICE_MARKER_STATUSES.focused}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "viewed"', () => {
    const { asFragment } = render(
      <BpkPriceMarkerV2
        label="£120"
        position={position}
        status={PRICE_MARKER_STATUSES.viewed}
        accessibilityLabel="Click the price marker"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });


  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarkerV2
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
      <BpkPriceMarkerV2
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
      <BpkPriceMarkerV2
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
