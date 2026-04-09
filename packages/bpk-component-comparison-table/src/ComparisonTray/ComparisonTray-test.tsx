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

import type { ReactElement } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { BpkProvider } from '../../../bpk-component-layout';

import ComparisonTray from './ComparisonTray';

import type { ComparisonItem } from './common-types';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

const ITEM_1: ComparisonItem = { id: '1', label: 'VIP Cars', image: 'car1.png' };
const ITEM_2: ComparisonItem = { id: '2', label: 'Hertz', image: 'car2.png' };
const ITEM_3: ComparisonItem = { id: '3', label: 'Avis', image: 'car3.png', imageAlt: 'Avis logo' };

const ARIA_LABEL = 'Comparison tray';
const REMOVE_LABEL = 'Remove';
const COMPARE_LABEL = 'Compare';

const noop = () => {};

describe('ComparisonTray items logic', () => {
  it('disables compare button and renders 0 items when items is empty', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    expect(screen.queryAllByRole('button', { name: /remove/i })).toHaveLength(0);
    // Empty state: with no items selected the compare button should be disabled.
    expect(screen.getByRole('button', { name: 'Compare' })).toBeDisabled();
  });

  it('renders 1 item and 2 placeholders when items has 1 entry', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(1);
    expect(screen.getByAltText('VIP Cars')).toBeInTheDocument();
  });

  it('renders 2 items and 1 placeholder when items has 2 entries', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(2);
    expect(screen.getByAltText('VIP Cars')).toBeInTheDocument();
    expect(screen.getByAltText('Hertz')).toBeInTheDocument();
  });

  it('renders 3 items and 0 placeholders when items has 3 entries', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2, ITEM_3]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getAllByRole('button', { name: /remove/i })).toHaveLength(3);
    expect(screen.getByAltText('VIP Cars')).toBeInTheDocument();
    expect(screen.getByAltText('Hertz')).toBeInTheDocument();
    expect(screen.getByAltText('Avis logo')).toBeInTheDocument();
  });
});

describe('ComparisonTray remove action', () => {
  it('calls onRemove with the correct item id when close button is clicked', () => {
    const onRemove = jest.fn();
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2]} ariaLabel={ARIA_LABEL} onRemove={onRemove} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove VIP Cars' }));

    expect(onRemove).toHaveBeenCalledWith('1');
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('calls onRemove with the correct id for the second item', () => {
    const onRemove = jest.fn();
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2]} ariaLabel={ARIA_LABEL} onRemove={onRemove} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove Hertz' }));

    expect(onRemove).toHaveBeenCalledWith('2');
  });
});

describe('ComparisonTray accessibility', () => {
  it('renders a region landmark with the provided aria-label', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getByRole('region', { name: 'Comparison tray' })).toBeInTheDocument();
  });

  it('renders a region landmark with custom aria-label', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel="Bandeja de comparación" onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getByRole('region', { name: 'Bandeja de comparación' })).toBeInTheDocument();
  });

  it('composes removeLabel with the item label for the remove button', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getByRole('button', { name: 'Remove VIP Cars' })).toBeInTheDocument();
  });

  it('uses a translated removeLabel', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel="Eliminar" />,
    );

    expect(screen.getByRole('button', { name: 'Eliminar VIP Cars' })).toBeInTheDocument();
  });
});

describe('ComparisonTray Compare button', () => {
  it('is disabled when items is empty', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    expect(screen.getByRole('button', { name: 'Compare' })).toBeDisabled();
  });

  it('is disabled when items has 1 entry', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    expect(screen.getByRole('button', { name: 'Compare' })).toBeDisabled();
  });

  it('is enabled when items has 2 entries', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    expect(screen.getByRole('button', { name: 'Compare' })).not.toBeDisabled();
  });

  it('is enabled when items has 3 entries', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2, ITEM_3]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    expect(screen.getByRole('button', { name: 'Compare' })).not.toBeDisabled();
  });

  it('calls onCompare when the Compare button is clicked', () => {
    const onCompare = jest.fn();
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1, ITEM_2]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={onCompare} removeLabel={REMOVE_LABEL} compareLabel={COMPARE_LABEL} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));

    expect(onCompare).toHaveBeenCalledTimes(1);
  });

  it('displays custom compareLabel', () => {
    renderWithProvider(
      <ComparisonTray.Root
        items={[ITEM_1, ITEM_2]}
        ariaLabel={ARIA_LABEL}
        onRemove={noop}
        onCompare={noop}
        compareLabel="Comparar"
        removeLabel={REMOVE_LABEL}
      />,
    );

    expect(screen.getByRole('button', { name: 'Comparar' })).toBeInTheDocument();
  });
});

describe('ComparisonTray image alt text', () => {
  it('defaults image alt to item label when imageAlt is not provided', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_1]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getByAltText('VIP Cars')).toBeInTheDocument();
  });

  it('uses imageAlt when provided', () => {
    renderWithProvider(
      <ComparisonTray.Root items={[ITEM_3]} ariaLabel={ARIA_LABEL} onRemove={noop} onCompare={noop} removeLabel={REMOVE_LABEL} />,
    );

    expect(screen.getByAltText('Avis logo')).toBeInTheDocument();
  });
});
