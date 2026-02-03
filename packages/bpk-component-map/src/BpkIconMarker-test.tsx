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

import BpkIconMarker from './BpkIconMarker';

jest.mock('@react-google-maps/api', () => ({
  OverlayView: (props) => (
    <div>
      <div className="mock-overlay-view" />
      {props.children}
    </div>
  ),
}));

describe('BpkIconMarker', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };
  const icon = <span>Icon</span>;

  it('should render properly', () => {
    const { asFragment } = render(
      <BpkIconMarker position={position} icon={icon} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "selected" attribute', () => {
    const { asFragment } = render(
      <BpkIconMarker position={position} icon={icon} selected />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkIconMarker
        position={position}
        icon={icon}
        className="custom-class-1 custom-class-2"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "buttonProps" attribute', () => {
    const { asFragment } = render(
      <BpkIconMarker
        position={position}
        icon={icon}
        buttonProps={{ testId: 'arbitrary value' }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
