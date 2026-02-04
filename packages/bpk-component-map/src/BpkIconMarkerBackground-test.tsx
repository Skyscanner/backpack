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

import BpkIconMarkerBackground from './BpkIconMarkerBackground';

describe('BpkIconMarkerBackground', () => {
  it('should render properly', () => {
    const { asFragment } = render(<BpkIconMarkerBackground />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with "disabled"', () => {
    const { asFragment } = render(<BpkIconMarkerBackground disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with "interactive"', () => {
    const { asFragment } = render(<BpkIconMarkerBackground interactive />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with "selected"', () => {
    const { asFragment } = render(<BpkIconMarkerBackground selected />);
    expect(asFragment()).toMatchSnapshot();
  });
});
