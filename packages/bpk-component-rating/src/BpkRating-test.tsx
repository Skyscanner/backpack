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

import BpkRating, { RATING_SIZES, RATING_SCALES } from '../index';

describe('BpkRating', () => {

  it('should render correctly', () => {
    render(
      <BpkRating
        ariaLabel="4.6 Excellent 672 reviews"
        value={4.6}
        title="Excellent"
        subtitle="672 reviews" />,
    );

    expect(screen.getByText('Excellent')).toBeVisible()
    expect(screen.getByText('672 reviews')).toBeVisible()
    expect(screen.getByLabelText('4.6 Excellent 672 reviews')).toBeInTheDocument();
  });

  it('should render large size correctly', () => {
     render(
      <BpkRating
        ariaLabel="4.6 Excellent 2,420 reviews"
        value={4.6}
        title="Excellent"
        subtitle="2,420 reviews"
        size={RATING_SIZES.large}
      />,
    );

    expect(screen.getByLabelText('4.6 Excellent 2,420 reviews')).toHaveClass('bpk-rating bpk-rating--large');
    expect(screen.getByText('Excellent')).toHaveClass('bpk-text bpk-text--heading-5');
  });

  it('should render showScale rating correctly', () => {
    render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        subtitle="Might recommend"
        value={6.7}
      />,
    );

    expect(screen.getByLabelText('6.7 Average might recommend')).toHaveClass('bpk-rating');
    expect(screen.getByText('/5')).toHaveClass('bpk-rating__scale');

  });

  it('should not show scale with showScale=false correctly', () => {
    render(
      <BpkRating
        ariaLabel="4.9 Awesome It is a fantanstic place"
        title="Awesome"
        subtitle="It is a fantanstic place"
        value={4.9}
        showScale={false}
      />,
    );

     expect(screen.queryByText('4.9')).not.toHaveClass('bpk-rating__scale');
  });

  it('should render title only correctly', () => {
    render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
      />,
    );

    expect(screen.getByText('Average')).toBeVisible();
    expect(document.querySelector('.bpk-rating__title--with-subtitle')).not.toBeInTheDocument();

  });

  it('should render large title only correctly', () => {
    render(
      <BpkRating
        ariaLabel="6.7 Average might recommend"
        title="Average"
        value={6.7}
        size={RATING_SIZES.large}
      />,
    );

    expect(screen.getByText('Average')).toHaveClass('bpk-text--heading-5');
    expect(screen.getByLabelText('6.7 Average might recommend')).toHaveClass('bpk-rating');
  });

  it('should render zero to ten scale rating correctly', () => {
    render(
      <BpkRating
        ariaLabel="8.2 Excellent 2,420 reviews"
        value={8.2}
        title="Excellent"
        subtitle="2,420 reviews"
        ratingScale={RATING_SCALES.zeroToTen}
      />,
    );

    expect(screen.getByText('Excellent')).toBeVisible();
    expect(screen.getByText('2,420 reviews')).toBeVisible();
    expect(screen.getByLabelText('8.2 Excellent 2,420 reviews')).toBeInTheDocument();
    expect(screen.getByText('8.2')).toHaveClass('bpk-text--label-1');
  });

  it('should correctly handling values lower than 0', () => {
    render(
      <BpkRating
        ariaLabel="-1.3 Low bad option"
        title="Low"
        subtitle="Bad option"
        value={-1.3}
        className="custom-classname"
      />,
    );

    expect(screen.getByText('Low')).toBeVisible();
    expect(screen.getByText('Bad option')).toBeVisible();
    expect(screen.getByLabelText('-1.3 Low bad option')).toBeInTheDocument();
    expect(screen.getByText('/5')).toHaveClass('bpk-rating__scale');
  });

  it('should correctly handling values higher than 5 when rating scale is zero to five', () => {
    render(
      <BpkRating
        ariaLabel="10 Super, smashing, great"
        title="Smashing"
        subtitle="Doubleplusgood"
        value={10}
        ratingScale={RATING_SCALES.zeroToFive}
      />,
    );

    expect(screen.getByText('Smashing')).toBeVisible();
    expect(screen.getByText('Doubleplusgood')).toBeVisible();
    expect(screen.getByLabelText('10 Super, smashing, great')).toBeInTheDocument();
    expect(screen.getByText('/5')).toHaveClass('bpk-rating__scale');
  });

  it('should correctly handling values higher than 10 when rating scale is zero to ten', () => {
    render(
      <BpkRating
        ariaLabel="15 Amazing brilliant"
        title="Amazing"
        subtitle="Brilliant"
        value={15}
        className="custom-classname"
        ratingScale={RATING_SCALES.zeroToTen}
      />,
    );

    expect(screen.getByText('Amazing')).toBeVisible();
    expect(screen.getByText('Brilliant')).toBeVisible();
    expect(screen.getByLabelText('15 Amazing brilliant')).toBeInTheDocument();
    expect(screen.getByText('/10')).toHaveClass('bpk-rating__scale');
  });

  it('should correctly when value is string type', () => {
    render(
      <BpkRating
        ariaLabel="4,6 Wonderful Wise choice"
        title="Wonderful"
        subtitle="Wise choice"
        value="4,6"
      />,
    );

    expect(screen.getByText('Wonderful')).toBeVisible();
    expect(screen.getByText('Wise choice')).toBeVisible();
    expect(screen.getByLabelText('4,6 Wonderful Wise choice')).toBeInTheDocument();
    expect(screen.getByText('4,6')).toHaveClass('bpk-text--label-1');
  });
});
