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

import BpkSpinner from './BpkSpinner';
import SPINNER_TYPES from './spinnerTypes';

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type as light', () => {
    const { asFragment } = render(<BpkSpinner type={SPINNER_TYPES.light} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type as primary', () => {
    const { asFragment } = render(<BpkSpinner type={SPINNER_TYPES.primary} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(<BpkSpinner className="my-custom-class" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const { asFragment } = render(<BpkSpinner alignToButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
