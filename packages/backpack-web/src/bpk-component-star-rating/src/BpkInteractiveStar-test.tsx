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
import '@testing-library/jest-dom';

import BpkInteractiveStar from './BpkInteractiveStar';
import { STAR_TYPES } from './BpkStar';

describe('BpkInteractiveStar', () => {
  it('renders an unselected empty star button', () => {
    render(
      <BpkInteractiveStar
        type={STAR_TYPES.EMPTY}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
      />,
    );

    const button = screen.getByRole('button', { name: 'One star' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveClass('bpk-interactive-star');
    expect(button).not.toHaveClass('bpk-interactive-star--selected');
    expect(button.querySelector('.bpk-star')).not.toHaveClass(
      'bpk-star--filled',
    );
  });

  it('renders an unselected full star button with the filled inner star', () => {
    render(
      <BpkInteractiveStar
        type={STAR_TYPES.FULL}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
      />,
    );

    const button = screen.getByRole('button', { name: 'One star' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveClass('bpk-interactive-star--selected');
    expect(button.querySelector('.bpk-star')).toHaveClass('bpk-star--filled');
  });

  it('marks the button as pressed and selected when "selected" is true', () => {
    render(
      <BpkInteractiveStar
        type={STAR_TYPES.FULL}
        label="One star"
        name="stars"
        value={1}
        onClick={() => null}
        onMouseEnter={() => null}
        selected
      />,
    );

    const button = screen.getByRole('button', { name: 'One star' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveClass('bpk-interactive-star--selected');
    expect(button.querySelector('.bpk-interactive-star__icon')).toHaveClass(
      'bpk-interactive-star__icon--selected',
    );
  });
});
