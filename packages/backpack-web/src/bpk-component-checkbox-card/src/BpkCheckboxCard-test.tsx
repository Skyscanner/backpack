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

import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS } from './BpkCheckboxCard';

import type { RootProps } from './BpkCheckboxCardRoot';

// @zag-js/dom-query uses PointerEvent internally; jsdom doesn't provide it.
beforeAll(() => {
  window.PointerEvent = class PointerEvent extends MouseEvent {} as typeof window.PointerEvent;
});

describe('BpkCheckboxCard (compound component)', () => {
  // Helper to render a minimal card
  const renderCard = (props: Partial<RootProps> = {}) =>
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}} {...props}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Select option</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

  it('should render correctly with minimal props', () => {
    const { asFragment } = renderCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when checked', () => {
    const { asFragment } = render(
      <BpkCheckboxCard.Root checked onCheckedChange={() => {}}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Select option</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled', () => {
    const { asFragment } = renderCard({ disabled: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with all content slots', () => {
    const { asFragment } = render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render onCanvasDefault variant correctly', () => {
    const { asFragment } = renderCard({ variant: CHECKBOX_CARD_VARIANTS.onCanvasDefault });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render onCanvasContrast variant correctly', () => {
    const { asFragment } = renderCard({ variant: CHECKBOX_CARD_VARIANTS.onCanvasContrast });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render onSurfaceContrast variant correctly', () => {
    const { asFragment } = renderCard({ variant: CHECKBOX_CARD_VARIANTS.onSurfaceContrast });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render square radius correctly', () => {
    const { asFragment } = renderCard({ radius: CHECKBOX_CARD_RADIUS.square });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render disabled and checked state correctly', () => {
    const { asFragment } = render(
      <BpkCheckboxCard.Root checked disabled onCheckedChange={() => {}}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Disabled selected</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be unchecked when checked=false', () => {
    renderCard({ checked: false });
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should be checked when checked=true', () => {
    renderCard({ checked: true });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should be disabled when disabled=true', () => {
    renderCard({ disabled: true });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should call onCheckedChange when clicked', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Click me</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should not call onCheckedChange when disabled', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange} disabled>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Disabled</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('should toggle when Space key is pressed', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Keyboard test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    screen.getByRole('checkbox').focus();
    await userEvent.keyboard(' ');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should support uncontrolled mode with defaultChecked', async () => {
    render(
      <BpkCheckboxCard.Root defaultChecked={false}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Uncontrolled</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should pass name and value to hidden input', () => {
    render(
      <BpkCheckboxCard.Root checked onCheckedChange={() => {}} name="hotel-option" value="city-centre">
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Form test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.name).toBe('hotel-option');
    expect(input.value).toBe('city-centre');
  });

  it('should always render the hidden input (Ark UI manages form state)', () => {
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}} name="hotel-option" value="city-centre">
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Form test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should render with extremely long label text', () => {
    const { asFragment } = render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>
            This is an extremely long label that will definitely exceed the maximum line count and should be truncated
          </BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
