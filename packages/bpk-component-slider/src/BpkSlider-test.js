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

const createNodeMock = () => document.createElement('div');

describe('BpkSlider', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSlider min={0} max={100} value={25} />, {
      createNodeMock,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkSlider min={0} max={100} value={25} className="my-slider" />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "step" attribute', () => {
    const { asFragment } = render(
      <BpkSlider min={0} max={100} value={2} step={10} />,
      {
        createNodeMock,
      },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a range of values', () => {
    const { asFragment } = render(
      <BpkSlider min={0} max={100} value={[10, 90]} />,
      {
        createNodeMock,
      },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a minimum distance between controls', () => {
    const { asFragment } = render(
      <BpkSlider min={0} max={100} value={[10, 90]} minDistance={20} />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
