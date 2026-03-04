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
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import BpkSegmentedControlV2 from './BpkSegmentedControlV2';

// ─── US1: Accessibility — base states ────────────────────────────────────────

describe('BpkSegmentedControlV2 accessibility — US1', () => {
  it('no axe violations: canvas-default type, 3 items, first selected, with label', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Sort results by" defaultValue="price">
        <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">Rating</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">Duration</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('no axe violations: root disabled', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Disabled group" defaultValue="price" disabled>
        <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">Rating</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('no axe violations: individual item disabled', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Cabin class" defaultValue="economy">
        <BpkSegmentedControlV2.Item value="economy">Economy</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="premium" disabled>
          Premium
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="business">Business</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('no axe violations: no initial selection', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Choose option">
        <BpkSegmentedControlV2.Item value="a">Option A</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="b">Option B</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// ─── US2: Accessibility — keyboard navigation ────────────────────────────────

describe('BpkSegmentedControlV2 accessibility — US2', () => {
  it('no axe violations: 3 items, second item focused via keyboard', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Sort by" defaultValue="price">
        <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">Rating</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">Duration</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    // Navigate to second item
    const priceInput = screen.getAllByRole('radio').find(
      (r) => (r as HTMLInputElement).value === 'price',
    )!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('focus moves to next item after ArrowRight keyboard navigation', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <BpkSegmentedControlV2.Root label="Sort by" value="price" onChange={onChange}>
        <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">Rating</BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">Duration</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const priceInput = screen.getAllByRole('radio').find(
      (r) => (r as HTMLInputElement).value === 'price',
    )!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');

    const ratingInput = screen.getAllByRole('radio').find(
      (r) => (r as HTMLInputElement).value === 'rating',
    )!;
    // After ArrowRight, focus moves to the next radio input.
    expect(document.activeElement).toBe(ratingInput);
  });
});

// ─── US5: Accessibility — custom content ────────────────────────────────────

describe('BpkSegmentedControlV2 accessibility — US5', () => {
  it('no axe violations: icon-only item with valid accessibilityLabel', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="View layout" defaultValue="grid">
        <BpkSegmentedControlV2.Item value="grid" accessibilityLabel="Grid view">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" />
          </svg>
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="list" accessibilityLabel="List view">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="3" width="14" height="2" />
          </svg>
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('axe violation IS reported: icon-only item with no accessible text', async () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="View layout" defaultValue="grid">
        <BpkSegmentedControlV2.Item value="grid">
          {/* No accessibilityLabel, no visible text — should fail axe */}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" />
          </svg>
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="list">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="3" width="14" height="2" />
          </svg>
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const results = await axe(container);
    expect(results.violations.length).toBeGreaterThan(0);
  });
});
