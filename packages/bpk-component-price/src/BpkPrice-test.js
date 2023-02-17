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

import BpkPrice from './BpkPrice';
import { ALIGNS, SIZES } from './common-types';

const price = '£1,830';
const previousPrice = '£2,000';
const leadingText = 'from';
const trailingText = 'per day';
let props;

describe.each([
  [SIZES.small, ALIGNS.left],
  [SIZES.large, ALIGNS.left],
  [SIZES.small, ALIGNS.right],
])(`%s %s view`, (size, align) => {
  beforeEach(() => {
    props = {
      price,
      size,
      align,
    };
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkPrice {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support trailing text attribute', () => {
    const { asFragment } = render(
      <BpkPrice {...props} trailingText={trailingText} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support leading text attribute', () => {
    const { asFragment } = render(
      <BpkPrice {...props} leadingText={leadingText} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support previous price attribute', () => {
    const { asFragment } = render(
      <BpkPrice
        {...props}
        previousPrice={previousPrice}
        leadingText={leadingText}
        trailingText={trailingText}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkPrice {...props} className="custom-classname" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
