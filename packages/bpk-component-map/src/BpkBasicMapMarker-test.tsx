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

import BpkBasicMapMarker from './BpkBasicMapMarker';

jest.mock('@react-google-maps/api', () => ({
  OverlayView: (props: { children: ReactNode }) => (
    <div>
      <div className="mock-overlay-view" />
      {props.children}
    </div>
  ),
}));

describe('BpkBasicMapMarker', () => {
  it('should render correctly', () => {
    const position = {
      latitude: 41.386947,
      longitude: 2.170048,
    };
    const { asFragment } = render(
      <BpkBasicMapMarker position={position}>Children</BpkBasicMapMarker>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
