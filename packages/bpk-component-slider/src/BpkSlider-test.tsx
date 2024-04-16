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

import BpkSlider from './BpkSlider';

// Mock the ResizeObserver which 'react-slider' uses to handle slider resize programatically
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkSlider', () => {
  const defaultProps = {
    min: 0,
    max: 100,
    value: 25,
    step: 10,
    onChange: jest.fn(),
    onAfterChange: jest.fn(),
    ariaLabel: ['min', 'max'],
    ariaValuetext: ['0','80']
  }
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSlider {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });


  it('should render correctly with a range of values', () => {
    const { asFragment } = render(
      <BpkSlider {...defaultProps} value={[10, 90]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a minimum distance between controls', () => {
    const { asFragment } = render(
      <BpkSlider {...defaultProps} value={[10, 90]} minDistance={20} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
