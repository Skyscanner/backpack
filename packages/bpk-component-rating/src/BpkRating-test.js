/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { render } from '@testing-library/react';

import BpkRating, { RATING_TYPES, RATING_SCALES } from '../index';

describe('BpkRating', () => {
  it('should render correctly', () => {
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

  it('should render vertical rating correctly', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        vertical
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a low score rating component', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="1.3 Low bad option"
        title="Low"
        subtitle="Bad option"
        value={1.3}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a medium score rating component (zero to ten scale)', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="7 Average it's ok at best"
        title="Average"
        subtitle="It's ok at best"
        value={7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a medium score rating component (zero to five scale)', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="3 Average it's ok at best"
        title="Average"
        subtitle="It's ok at best"
        value={3}
        ratingScale={RATING_SCALES.zeroToFive}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a high score rating component (zero to ten scale)', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="9 Amazing best thing since sliced bread"
        title="Amazing"
        subtitle="Best thing since sliced bread"
        value={9}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a high score rating component (zero to five scale)', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="4 Amazing best thing since sliced bread"
        title="Amazing"
        subtitle="Best thing since sliced bread"
        value={4}
        ratingScale={RATING_SCALES.zeroToFive}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a high score rating component', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="9 Amazing best thing since sliced bread"
        title="Amazing"
        subtitle="Best thing since sliced bread"
        value={9}
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
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a small rating component', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size="sm"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a large rating component', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="9 Excellent would recommend"
        title="Excellent"
        subtitle="This place was amazing"
        value={9}
        size="lg"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly pill rating', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        type={RATING_TYPES.pill}
        value={6.7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly title only pill rating', () => {
    const { asFragment } = render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        type={RATING_TYPES.pill}
        value={6.7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
