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

import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS } from './index';

describe('BpkCheckboxCard (compound component)', () => {
  // Helper to render a minimal card
  const renderCard = (props: Record<string, any> = {}) =>
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}} {...props}>
        <BpkCheckboxCard.Control />
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
        <BpkCheckboxCard.Control />
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
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Stack gap="md" align="center">
            <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
            <BpkCheckboxCard.Price price="£85" />
          </BpkCheckboxCard.Stack>
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
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Disabled selected</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have aria-checked="false" when unchecked', () => {
    renderCard({ checked: false });
    const card = screen.getByRole('checkbox');
    expect(card).toHaveAttribute('aria-checked', 'false');
  });

  it('should have aria-checked="true" when checked', () => {
    renderCard({ checked: true });
    const card = screen.getByRole('checkbox');
    expect(card).toHaveAttribute('aria-checked', 'true');
  });

  it('should have aria-disabled when disabled', () => {
    renderCard({ disabled: true });
    const card = screen.getByRole('checkbox');
    expect(card).toHaveAttribute('aria-disabled', 'true');
  });

  it('should call onCheckedChange when clicked', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange}>
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Click me</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const card = screen.getByRole('checkbox');
    await userEvent.click(card);

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should not call onCheckedChange when disabled', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange} disabled>
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Disabled</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const card = screen.getByRole('checkbox');
    await userEvent.click(card);

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('should toggle when Space key is pressed', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange}>
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Keyboard test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const card = screen.getByRole('checkbox');
    card.focus();
    await userEvent.keyboard(' ');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should toggle when Enter key is pressed', async () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={onCheckedChange}>
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Enter key test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const card = screen.getByRole('checkbox');
    card.focus();
    await userEvent.keyboard('{Enter}');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should support uncontrolled mode with defaultChecked', async () => {
    render(
      <BpkCheckboxCard.Root defaultChecked={false}>
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Uncontrolled</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const card = screen.getByRole('checkbox');
    expect(card).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(card);
    expect(card).toHaveAttribute('aria-checked', 'true');
  });

  it('should pass name and value to hidden input', () => {
    render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}} name="hotel-option" value="city-centre">
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Form test</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );

    const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.name).toBe('hotel-option');
    expect(input.value).toBe('city-centre');
  });

  it('should render with extremely long label text', () => {
    const { asFragment } = render(
      <BpkCheckboxCard.Root checked={false} onCheckedChange={() => {}}>
        <BpkCheckboxCard.Control />
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
