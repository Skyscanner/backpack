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
import '@testing-library/jest-dom';

import BpkStar, { STAR_TYPES } from './BpkStar';

describe('BpkStar', () => {
  it('renders an empty star without the filled or half modifiers', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.EMPTY} />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star');
    expect(star).not.toHaveClass('bpk-star--filled');
    expect(star).not.toHaveClass('bpk-star__container--half-star');
  });

  it('renders a half star with the half-container modifier', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.HALF} />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star__container');
    expect(star).toHaveClass('bpk-star__container--half-star');
  });

  it('renders a full star with the filled modifier', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.FULL} />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star');
    expect(star).toHaveClass('bpk-star--filled');
  });

  it('applies the large modifier to an empty star', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.EMPTY} large />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star--large');
    expect(star).not.toHaveClass('bpk-star--filled');
  });

  it('applies the large modifier to a half star', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.HALF} large />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star__container--half-star');
    expect(star).toHaveClass('bpk-star__container--large');
  });

  it('applies the large modifier to a full star', () => {
    const { container } = render(<BpkStar type={STAR_TYPES.FULL} large />);
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star--filled');
    expect(star).toHaveClass('bpk-star--large');
  });

  it('appends a custom className', () => {
    const { container } = render(
      <BpkStar type={STAR_TYPES.FULL} className="my-class" />,
    );
    const star = container.firstChild as HTMLElement;

    expect(star).toHaveClass('bpk-star--filled');
    expect(star).toHaveClass('my-class');
  });
});
