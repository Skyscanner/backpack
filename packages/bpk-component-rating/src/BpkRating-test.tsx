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

import BpkRating, { RATING_SIZES, RATING_SCALES } from '../index';

describe('BpkRating', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="4.6 Excellent 672 reviews"
        value={4.6}
        title="Excellent"
        subtitle="672 reviews"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render large size correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="4.6 Excellent 2,420 reviews"
        value={4.6}
        title="Excellent"
        subtitle="2,420 reviews"
        size={RATING_SIZES.large}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render showScale rating correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not show scale with showScale=false correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="4.9 Awesome It is a fantanstic place"
        title="Awesome"
        subtitle="It is a fantanstic place"
        value={4.9}
        showScale={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render title only correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render large title only correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
        size={RATING_SIZES.large}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render zero to ten scale rating correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="8.2 Excellent 2,420 reviews"
        value={8.2}
        title="Excellent"
        subtitle="2,420 reviews"
        ratingScale={RATING_SCALES.zeroToTen}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should correctly handling values lower than 0', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="-1.3 Low bad option"
        title="Low"
        subtitle="Bad option"
        value={-1.3}
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should correctly handling values higher than 5 when rating scale is zero to five', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="10 Super, smashing, great"
        title="Smashing"
        subtitle="Doubleplusgood"
        value={10}
        ratingScale={RATING_SCALES.zeroToFive}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should correctly handling values higher than 10 when rating scale is zero to ten', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="15 Amazing brilliant"
        title="Amazing"
        subtitle="Brilliant"
        value={15}
        className="custom-classname"
        ratingScale={RATING_SCALES.zeroToTen}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should correctly when value is string type', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="4,6 Wonderful Wise choice"
        title="Wonderful"
        subtitle="Wise choice"
        value="4,6"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
