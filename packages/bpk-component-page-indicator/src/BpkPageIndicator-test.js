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

import { render } from '@testing-library/react';

import BpkPageIndicator from './BpkPageIndicator';

import React from 'react';

let props;

describe('BpkPageIndicator', () => {
  beforeEach(() => {
    props = {
      currentIndex: 0,
      totalBullets: 7,
    };
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkPageIndicator {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkPageIndicator {...props} className="custom-classname" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support showNav attribute', () => {
    const { asFragment } = render(<BpkPageIndicator {...props} showNav />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(<BpkPageIndicator {...props} testid="123" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
