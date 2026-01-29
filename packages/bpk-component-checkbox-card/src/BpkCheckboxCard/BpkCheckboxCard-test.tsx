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

import BpkCheckboxCard, { CHECKBOX_CARD_VARIANTS } from './BpkCheckboxCard';

describe('BpkCheckboxCard', () => {
  it('should render correctly with minimal props', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Select option"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when checked', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Select option"
        price="£100"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Select option"
        disabled
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with all content props', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="City Centre"
        description="Best location"
        icon={<div>Icon</div>}
        image="test.jpg"
        price="£85"
        indicator={<div>✓</div>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with-background variant correctly', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="With background"
        variant={CHECKBOX_CARD_VARIANTS.withBackground}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render no-background variant correctly', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="No background"
        variant={CHECKBOX_CARD_VARIANTS.noBackground}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onChange when clicked', async () => {
    const onChange = jest.fn();
    render(
      <BpkCheckboxCard
        checked={false}
        onChange={onChange}
        label="Click me"
        data-testid="checkbox-card"
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('should not call onChange when disabled', async () => {
    const onChange = jest.fn();
    render(
      <BpkCheckboxCard
        checked={false}
        onChange={onChange}
        label="Disabled"
        disabled
        data-testid="checkbox-card"
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should handle keyboard interactions (Space key)', async () => {
    const onChange = jest.fn();
    render(
      <BpkCheckboxCard
        checked={false}
        onChange={onChange}
        label="Keyboard test"
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');

    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('should render with name and value attributes', () => {
    render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Form test"
        name="hotel-option"
        value="city-centre"
      />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.name).toBe('hotel-option');
    expect(checkbox.value).toBe('city-centre');
  });

  it('should render correctly with extremely long text', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="This is an extremely long label that will definitely exceed the maximum line count and should be truncated with an ellipsis to prevent layout breaking"
        description="This is also a very long description that goes on and on and on and should also be truncated after a certain number of lines"
        price="£9,999"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render disabled and checked state correctly', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked
        onChange={() => {}}
        label="Disabled but selected"
        disabled
        price="£100"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
