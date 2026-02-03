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

import BpkFlareBar from './BpkFlareBar';

describe('BpkFlareBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkFlareBar />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(<BpkFlareBar className="my-custom-class" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "svgClassName" attribute', () => {
    const { asFragment } = render(
      <BpkFlareBar svgClassName="my-custom-class" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rounded" set to `false`', () => {
    const { asFragment } = render(<BpkFlareBar rounded={false} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
