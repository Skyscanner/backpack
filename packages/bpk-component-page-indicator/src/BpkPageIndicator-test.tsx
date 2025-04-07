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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkPageIndicator from './BpkPageIndicator';

import type { Props } from './BpkPageIndicator';

describe('BpkPageIndicator', () => {
  let props: Props

  beforeEach(() => {
    props = {
      currentIndex: 0,
      totalIndicators: 7,
      indicatorLabel: 'Go to slide',
      prevNavLabel: 'Previous slide',
      nextNavLabel: 'Next slide',
      onClick: jest.fn(),
    };
  });

  it('should render correctly', () => {
    render(<BpkPageIndicator {...props} />);

    expect(screen.getAllByRole('button').length).toBe(7);
  });

  it('should support custom class names', () => {
    render(
      <BpkPageIndicator {...props} className="custom-classname" />,
    );

    expect(document.querySelector('.custom-classname')).toBeTruthy();
  });

  it('should support showNav attribute', () => {
    render(<BpkPageIndicator {...props} showNav />);

    expect(screen.getByLabelText('Previous slide')).toBeTruthy();
    expect(screen.getByLabelText('Next slide')).toBeTruthy();
  });
});
