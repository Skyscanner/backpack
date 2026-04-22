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

import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCompareModal from './BpkCompareModal';

import type { BpkCompareColumn } from './common-types';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

expect.extend(toHaveNoViolations);

beforeAll(() => {
  (window as any).IntersectionObserver = class IntersectionObserver {
    observe = jest.fn();

    disconnect = jest.fn();

    unobserve = jest.fn();
  };
});

const noop = () => {};

const BASE_ROWS = [
  { rowId: 'cancellation', cell: <span>Free cancellation</span> },
  { rowId: 'stars', cell: <span>3.5 stars</span> },
];

const COLUMN_1: BpkCompareColumn = {
  itemId: 'col-1',
  headerContent: <div>Column 1</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 1',
  bestTag: true,
};

const COLUMN_2: BpkCompareColumn = {
  itemId: 'col-2',
  headerContent: <div>Column 2</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 2',
};

const TRANSLATIONS = {
  closeLabel: 'Close comparison',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare',
  addMoreLinkText: 'Add more',
};

const renderModal = (columns: BpkCompareColumn[], title?: string) =>
  renderWithProvider(
    <BpkCompareModal.Root isOpen onClose={noop}>
      <BpkCompareModal.Header title={title} translations={TRANSLATIONS} />
      <BpkCompareModal.Content
        columns={columns}
        onRemove={noop}
        onAddMoreClick={noop}
        translations={TRANSLATIONS}
      />
    </BpkCompareModal.Root>,
  );

describe('BpkCompareModal accessibility', () => {
  it('has no accessibility violations with 1 column and 2 placeholders', async () => {
    const { container } = renderModal([COLUMN_1]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with 2 columns and 1 placeholder', async () => {
    const { container } = renderModal([COLUMN_1, COLUMN_2]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with 3 columns and no placeholder', async () => {
    const COLUMN_3: BpkCompareColumn = {
      itemId: 'col-3',
      headerContent: <div>Column 3</div>,
      rows: BASE_ROWS,
      removeA11yLabel: 'Remove column 3',
    };

    const { container } = renderModal([COLUMN_1, COLUMN_2, COLUMN_3]);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with a title', async () => {
    const { container } = renderModal([COLUMN_1, COLUMN_2], 'Compare cars');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
