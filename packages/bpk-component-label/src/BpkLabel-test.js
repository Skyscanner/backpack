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

import BpkLabel from './BpkLabel';

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkLabel>Origin</BpkLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const { asFragment } = render(<BpkLabel white>Origin</BpkLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "required" attribute', () => {
    const { asFragment } = render(<BpkLabel required>Origin</BpkLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "valid" attribute false', () => {
    const { asFragment } = render(<BpkLabel valid={false}>Origin</BpkLabel>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "valid" attribute false and "required" attributes', () => {
    const { asFragment } = render(
      <BpkLabel required valid={false}>
        Origin
      </BpkLabel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without an asterisk when disabled and required', () => {
    const { asFragment } = render(
      <BpkLabel disabled required>
        Origin
      </BpkLabel>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(<BpkLabel className="test">Origin</BpkLabel>);
    expect(asFragment()).toMatchSnapshot();
  });
});
