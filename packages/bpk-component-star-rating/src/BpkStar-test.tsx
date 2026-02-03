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
// @ts-nocheck



import { render } from '@testing-library/react';

import BpkStar, { STAR_TYPES } from './BpkStar';

describe('BpkStar', () => {
  it('should render correctly with empty star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.EMPTY} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with half star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.HALF} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with full star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.FULL} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a large empty star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.EMPTY} large />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a large half star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.HALF} large />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a large full star', () => {
    const { asFragment } = render(<BpkStar type={STAR_TYPES.FULL} large />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" prop', () => {
    const { asFragment } = render(
      <BpkStar type={STAR_TYPES.FULL} className="my-class" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
