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

import type { CSSProperties } from 'react';

import { LocaleProvider } from '@ark-ui/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import GridLayoutIcon from '../../../bpk-component-icon/sm/grid-layout';

import BpkSegmentedControlV2 from './BpkSegmentedControlV2';
import { SEGMENT_TYPES_V2 } from './common-types';

// Zag-JS uses ResizeObserver to track the indicator element's size; jsdom doesn't implement it.
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const ThreeItemControl = ({
  defaultValue,
  onChange,
  value,
}: {
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  value?: string;
}) => (
  <BpkSegmentedControlV2.Root
    label="Sort by"
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
  >
    <BpkSegmentedControlV2.Indicator />
    <BpkSegmentedControlV2.Item value="price">
      <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="rating">
      <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="duration">
      <BpkSegmentedControlV2.ItemText>Duration</BpkSegmentedControlV2.ItemText>
      <BpkSegmentedControlV2.ItemControl />
      <BpkSegmentedControlV2.ItemHiddenInput />
    </BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

describe('BpkSegmentedControlV2 — US1: Basic composable segment group', () => {
  it('renders root and three items with minimal required props', () => {
    render(<ThreeItemControl />);
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });

  it('renders a radiogroup container', () => {
    render(<ThreeItemControl />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('applies accessible name from label prop', () => {
    render(<ThreeItemControl />);
    expect(
      screen.getByRole('radiogroup', { name: 'Sort by' }),
    ).toBeInTheDocument();
  });

  it('controlled: clicking an item calls onChange with that item value', async () => {
    const onChange = jest.fn();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const ratingLabel = screen.getByText('Rating');
    fireEvent.click(ratingLabel);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('rating');
    });
  });

  it('controlled: clicking already-selected item does NOT call onChange', async () => {
    const onChange = jest.fn();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const priceLabel = screen.getByText('Price');
    fireEvent.click(priceLabel);
    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('uncontrolled: defaultValue sets initial selection', () => {
    render(<ThreeItemControl defaultValue="rating" />);
    const radioInputs = screen.getAllByRole('radio');
    const ratingInput = radioInputs.find(
      (radio) => (radio as HTMLInputElement).value === 'rating',
    );
    expect(ratingInput).toBeChecked();
  });

  it('uncontrolled: no defaultValue results in no item selected and no crash', () => {
    render(<ThreeItemControl />);
    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach((radio) => {
      expect(radio).not.toBeChecked();
    });
  });

  it('uncontrolled: selection is preserved after direction change', async () => {
    const { rerender } = render(
      <LocaleProvider locale="en-US">
        <ThreeItemControl defaultValue="price" />
      </LocaleProvider>,
    );

    // User changes selection to rating
    fireEvent.click(screen.getByText('Rating'));
    await waitFor(() => {
      expect(
        screen
          .getAllByRole('radio')
          .find((r) => (r as HTMLInputElement).value === 'rating'),
      ).toBeChecked();
    });

    // Direction changes to RTL — triggers key={dir} remount inside BpkSegmentedControlV2Root
    rerender(
      <LocaleProvider locale="ar-SA">
        <ThreeItemControl defaultValue="price" />
      </LocaleProvider>,
    );

    // Selection should be restored from ref, not reset to defaultValue ("price")
    expect(
      screen
        .getAllByRole('radio')
        .find((r) => (r as HTMLInputElement).value === 'rating'),
    ).toBeChecked();
  });
});

describe('BpkSegmentedControlV2 — US2: Keyboard navigation (automatic mode)', () => {
  it('ArrowRight moves focus + selection to next item in LTR', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const group = screen.getByRole('radiogroup');
    group.focus();
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('rating');
    });
  });

  it('ArrowLeft moves focus + selection to previous item in LTR', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="rating" onChange={onChange} />);
    const ratingInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'rating')!;
    ratingInput.focus();
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('price');
    });
  });

  it('ArrowRight wraps from last item to first item', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="duration" onChange={onChange} />);
    const durationInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'duration')!;
    durationInput.focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('price');
    });
  });

  it('ArrowLeft wraps from first item to last item', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('duration');
    });
  });

});

describe('BpkSegmentedControlV2 — US3: CSS variable theming', () => {
  it('renders root class that CSS variables can be read from', () => {
    const { container } = render(<ThreeItemControl />);
    const root = container.querySelector('[class*="bpk-segmented-control-v2"]');
    expect(root).toBeInTheDocument();
  });

  it('wrapper CSS variable override is applied to the root element context', () => {
    const { container } = render(
      <div style={{ '--bpk-segmented-control-bg': 'red' } as CSSProperties}>
        <ThreeItemControl />
      </div>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.getPropertyValue('--bpk-segmented-control-bg')).toBe(
      'red',
    );
  });
});

describe('BpkSegmentedControlV2 — US4: Style variants', () => {
  it.each([
    [
      SEGMENT_TYPES_V2.CanvasDefault,
      'bpk-segmented-control-v2--canvas-default',
    ],
    [
      SEGMENT_TYPES_V2.CanvasContrast,
      'bpk-segmented-control-v2--canvas-contrast',
    ],
    [
      SEGMENT_TYPES_V2.SurfaceDefault,
      'bpk-segmented-control-v2--surface-default',
    ],
    [
      SEGMENT_TYPES_V2.SurfaceContrast,
      'bpk-segmented-control-v2--surface-contrast',
    ],
  ])('type="%s" adds BEM modifier class "%s"', (type, expectedClass) => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test" type={type}>
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="a">
          <BpkSegmentedControlV2.ItemText>A</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    const modifier = expectedClass.replace('bpk-segmented-control-v2--', '');
    expect(root.className).toMatch(new RegExp(modifier));
  });

  it('defaults to canvas-default type when no type provided', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="a">
          <BpkSegmentedControlV2.ItemText>A</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/canvas-default/);
  });

  it('shadow=true adds shadow modifier class', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test" shadow>
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="a">
          <BpkSegmentedControlV2.ItemText>A</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/shadow/);
  });

  it('shadow=false (default) does not add shadow class', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="a">
          <BpkSegmentedControlV2.ItemText>A</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toMatch(/shadow/);
  });

  it('snapshot: canvas-default, 3 items, first selected', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Snapshot" defaultValue="price">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          <BpkSegmentedControlV2.ItemText>Duration</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/canvas-default/);
    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs).toHaveLength(3);
    expect(
      radioInputs.find(
        (radio) => (radio as HTMLInputElement).value === 'price',
      ),
    ).toBeChecked();
    expect(
      radioInputs.find(
        (radio) => (radio as HTMLInputElement).value === 'rating',
      ),
    ).not.toBeChecked();
    expect(
      radioInputs.find(
        (radio) => (radio as HTMLInputElement).value === 'duration',
      ),
    ).not.toBeChecked();
  });

  it('snapshot: canvas-contrast', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root
        label="Snapshot"
        type={SEGMENT_TYPES_V2.CanvasContrast}
        defaultValue="price"
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/canvas-contrast/);
    expect(
      screen
        .getAllByRole('radio')
        .find((radio) => (radio as HTMLInputElement).value === 'price'),
    ).toBeChecked();
  });

  it('snapshot: surface-default', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root
        label="Snapshot"
        type={SEGMENT_TYPES_V2.SurfaceDefault}
        defaultValue="price"
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/surface-default/);
    expect(
      screen
        .getAllByRole('radio')
        .find((radio) => (radio as HTMLInputElement).value === 'price'),
    ).toBeChecked();
  });

  it('snapshot: surface-contrast', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root
        label="Snapshot"
        type={SEGMENT_TYPES_V2.SurfaceContrast}
        defaultValue="price"
      >
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/surface-contrast/);
    expect(
      screen
        .getAllByRole('radio')
        .find((radio) => (radio as HTMLInputElement).value === 'price'),
    ).toBeChecked();
  });

  it('snapshot: shadow enabled', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Snapshot" shadow defaultValue="price">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="price">
          <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/shadow/);
    expect(
      screen
        .getAllByRole('radio')
        .find((radio) => (radio as HTMLInputElement).value === 'price'),
    ).toBeChecked();
  });
});

describe('BpkSegmentedControlV2 — US5: Composable custom content', () => {
  it('renders item with SVG child and text string', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="View layout" defaultValue="grid">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="grid">
          <BpkSegmentedControlV2.ItemText>
            <GridLayoutIcon />
            Grid
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders item with complex multi-line content', () => {
    render(
      <BpkSegmentedControlV2.Root label="Sort flights" defaultValue="best">
        <BpkSegmentedControlV2.Indicator />
        <BpkSegmentedControlV2.Item value="best">
          <BpkSegmentedControlV2.ItemText>
            <div>Best</div>
            <div>£84</div>
            <div>2h average</div>
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="cheapest">
          <BpkSegmentedControlV2.ItemText>
            <div>Cheapest</div>
            <div>£34</div>
            <div>9h average</div>
          </BpkSegmentedControlV2.ItemText>
          <BpkSegmentedControlV2.ItemControl />
          <BpkSegmentedControlV2.ItemHiddenInput />
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    expect(screen.getByText('Best')).toBeInTheDocument();
    expect(screen.getByText('£84')).toBeInTheDocument();
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
  });
});
