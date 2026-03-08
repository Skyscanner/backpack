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

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import GridLayoutIcon from '../../../bpk-component-icon/sm/grid-layout';
import ListIcon from '../../../bpk-component-icon/sm/list';

import BpkSegmentedControlV2 from './BpkSegmentedControlV2';
import { SEGMENT_TYPES_V2 } from './common-types';

const mockIsRtl = jest.fn(() => false);

jest.mock('../../../bpk-react-utils', () => ({
  ...jest.requireActual('../../../bpk-react-utils'),
  isRTL: () => mockIsRtl(),
}));

const ThreeItemControl = ({
  defaultValue,
  disabled,
  onChange,
  value,
}: {
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
}) => (
  <BpkSegmentedControlV2.Root
    label="Sort by"
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    disabled={disabled}
  >
    <BpkSegmentedControlV2.Item value="price">Price</BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="rating">
      Rating
    </BpkSegmentedControlV2.Item>
    <BpkSegmentedControlV2.Item value="duration">
      Duration
    </BpkSegmentedControlV2.Item>
  </BpkSegmentedControlV2.Root>
);

describe('BpkSegmentedControlV2 — US1: Basic composable segment group', () => {
  beforeEach(() => {
    mockIsRtl.mockReturnValue(false);
    jest.clearAllMocks();
  });

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

  it('root disabled: clicking any item does not fire onChange', async () => {
    const onChange = jest.fn();
    render(<ThreeItemControl value="price" onChange={onChange} disabled />);
    const ratingLabel = screen.getByText('Rating');
    fireEvent.click(ratingLabel);
    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('individual item disabled: only that item is non-interactive', () => {
    const onChange = jest.fn();
    render(
      <BpkSegmentedControlV2.Root
        label="Cabin class"
        value="economy"
        onChange={onChange}
      >
        <BpkSegmentedControlV2.Item value="economy">
          Economy
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="premium" disabled>
          Premium
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="business">
          Business
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const radioInputs = screen.getAllByRole('radio');
    const premiumInput = radioInputs.find(
      (radio) => (radio as HTMLInputElement).value === 'premium',
    );
    expect(premiumInput).toBeDisabled();
  });
});

describe('BpkSegmentedControlV2 — US2: Keyboard navigation (automatic mode)', () => {
  beforeEach(() => {
    mockIsRtl.mockReturnValue(false);
    jest.clearAllMocks();
  });

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

  it('Home moves focus + selection to first item', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="duration" onChange={onChange} />);
    const durationInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'duration')!;
    durationInput.focus();
    await user.keyboard('{Home}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('price');
    });
  });

  it('End moves focus + selection to last item', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{End}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('duration');
    });
  });

  it('RTL: ArrowRight behaves as ArrowLeft (moves to previous)', async () => {
    mockIsRtl.mockReturnValue(true);
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="rating" onChange={onChange} />);
    const ratingInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'rating')!;
    ratingInput.focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('price');
    });
  });

  it('RTL: ArrowLeft behaves as ArrowRight (moves to next)', async () => {
    mockIsRtl.mockReturnValue(true);
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ThreeItemControl value="price" onChange={onChange} />);
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('rating');
    });
  });
});

describe('BpkSegmentedControlV2 — US2: Manual activation mode', () => {
  beforeEach(() => {
    mockIsRtl.mockReturnValue(false);
    jest.clearAllMocks();
  });

  it('manual mode: ArrowRight moves DOM focus but does NOT call onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <BpkSegmentedControlV2.Root
        label="Sort"
        value="price"
        onChange={onChange}
        activationMode="manual"
      >
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          Duration
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('manual mode: Space on focused item calls onChange with that item value', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <BpkSegmentedControlV2.Root
        label="Sort"
        value="price"
        onChange={onChange}
        activationMode="manual"
      >
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          Duration
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');
    await user.keyboard(' ');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('rating');
    });
  });

  it('manual mode: Enter on focused item calls onChange with that item value', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <BpkSegmentedControlV2.Root
        label="Sort"
        value="price"
        onChange={onChange}
        activationMode="manual"
      >
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          Duration
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const priceInput = screen
      .getAllByRole('radio')
      .find((radio) => (radio as HTMLInputElement).value === 'price')!;
    priceInput.focus();
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('rating');
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
        <BpkSegmentedControlV2.Item value="a">A</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    const modifier = expectedClass.replace('bpk-segmented-control-v2--', '');
    expect(root.className).toMatch(new RegExp(modifier));
  });

  it('defaults to canvas-default type when no type provided', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test">
        <BpkSegmentedControlV2.Item value="a">A</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/canvas-default/);
  });

  it('shadow=true adds shadow modifier class', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test" shadow>
        <BpkSegmentedControlV2.Item value="a">A</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/shadow/);
  });

  it('shadow=false (default) does not add shadow class', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Test">
        <BpkSegmentedControlV2.Item value="a">A</BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toMatch(/shadow/);
  });

  it('snapshot: canvas-default, 3 items, first selected', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="Snapshot" defaultValue="price">
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="duration">
          Duration
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
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
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
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
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
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
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
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
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

  it('snapshot: root disabled', () => {
    render(
      <BpkSegmentedControlV2.Root
        label="Snapshot"
        defaultValue="price"
        disabled
      >
        <BpkSegmentedControlV2.Item value="price">
          Price
        </BpkSegmentedControlV2.Item>
        <BpkSegmentedControlV2.Item value="rating">
          Rating
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach((radio) => expect(radio).toBeDisabled());
    expect(
      radioInputs.find(
        (radio) => (radio as HTMLInputElement).value === 'price',
      ),
    ).toBeChecked();
  });
});

describe('BpkSegmentedControlV2 — US5: Composable custom content', () => {
  it('renders item with SVG child and text string', () => {
    const { container } = render(
      <BpkSegmentedControlV2.Root label="View layout" defaultValue="grid">
        <BpkSegmentedControlV2.Item value="grid">
          <GridLayoutIcon />
          Grid
        </BpkSegmentedControlV2.Item>
      </BpkSegmentedControlV2.Root>,
    );
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });


});
