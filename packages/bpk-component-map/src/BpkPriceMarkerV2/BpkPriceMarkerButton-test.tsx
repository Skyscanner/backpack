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

import { MARKER_STATUSES } from './BpkPriceMarker';
import BpkPriceMarkerButton from './BpkPriceMarkerButton';

describe('BpkPriceMarkerButton', () => {
  it('should render properly', () => {
    const { asFragment } = render(<BpkPriceMarkerButton label="£120" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with a icon', () => {
    const icon = <span>Icon</span>;
    const { asFragment } = render(
      <BpkPriceMarkerButton
        label="£120"
        icon={icon}
        status={MARKER_STATUSES.selected}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "selected"', () => {
    const { asFragment } = render(
      <BpkPriceMarkerButton label="£120" status={MARKER_STATUSES.selected} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "previous_selected"', () => {
    const { asFragment } = render(
      <BpkPriceMarkerButton
        label="£120"
        status={MARKER_STATUSES.previous_selected}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarkerButton
        label="£120"
        className="custom-class-1 custom-class-2"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "buttonProps" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarkerButton
        label="£120"
        buttonProps={{ testId: 'arbitrary value' }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "onClick" attribute', () => {
    const { asFragment } = render(
      <BpkPriceMarkerButton
        label="£120"
        onClick={() => {
          alert('Marker clicked'); // eslint-disable-line no-alert
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
