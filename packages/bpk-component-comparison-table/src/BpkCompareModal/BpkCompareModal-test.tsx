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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCompareModal from './BpkCompareModal';

import type { BpkCompareColumn } from './common-types';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

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
  headerContent: <div>Column 1 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 1',
  bestTag: true,
};

const COLUMN_2: BpkCompareColumn = {
  itemId: 'col-2',
  headerContent: <div>Column 2 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 2',
};

const COLUMN_3: BpkCompareColumn = {
  itemId: 'col-3',
  headerContent: <div>Column 3 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 3',
};

const TRANSLATIONS = {
  closeLabel: 'Close',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare',
  addMoreLinkText: 'Add more',
};

const renderModal = (columns: BpkCompareColumn[], overrides: { onRemove?: (id: string) => void; onAddMoreClick?: () => void } = {}) =>
  renderWithProvider(
    <BpkCompareModal.Root isOpen onClose={noop}>
      <BpkCompareModal.Header translations={TRANSLATIONS} />
      <BpkCompareModal.Content
        columns={columns}
        onRemove={overrides.onRemove ?? noop}
        onAddMoreClick={overrides.onAddMoreClick ?? noop}
        translations={TRANSLATIONS}
      />
    </BpkCompareModal.Root>,
  );

describe('BpkCompareModal', () => {
  describe('column rendering', () => {
    it('renders 1 filled column and 2 placeholders when 1 column provided', () => {
      renderModal([COLUMN_1]);

      expect(screen.getByText('Column 1 header')).toBeInTheDocument();
      expect(screen.getAllByText('Add more')).toHaveLength(2);
    });

    it('renders 2 filled columns and 1 placeholder when 2 columns provided', () => {
      renderModal([COLUMN_1, COLUMN_2]);

      expect(screen.getByText('Column 1 header')).toBeInTheDocument();
      expect(screen.getByText('Column 2 header')).toBeInTheDocument();
      expect(screen.getAllByText('Add more')).toHaveLength(1);
    });

    it('renders 3 filled columns and no placeholder when 3 columns provided', () => {
      renderModal([COLUMN_1, COLUMN_2, COLUMN_3]);

      expect(screen.getByText('Column 1 header')).toBeInTheDocument();
      expect(screen.getByText('Column 2 header')).toBeInTheDocument();
      expect(screen.getByText('Column 3 header')).toBeInTheDocument();
      expect(screen.queryByText('Add more')).not.toBeInTheDocument();
    });
  });

  describe('onRemove callback', () => {
    it('fires onRemove with the correct itemId when Remove is clicked', async () => {
      const onRemove = jest.fn();
      renderModal([COLUMN_1, COLUMN_2], { onRemove });

      await userEvent.click(screen.getByLabelText('Remove column 1'));
      expect(onRemove).toHaveBeenCalledWith('col-1');

      await userEvent.click(screen.getByLabelText('Remove column 2'));
      expect(onRemove).toHaveBeenCalledWith('col-2');
    });
  });

  describe('onAddMoreClick callback', () => {
    it('fires onAddMoreClick when the Add more button is clicked', async () => {
      const onAddMoreClick = jest.fn();
      renderModal([COLUMN_1], { onAddMoreClick });

      const addMoreButtons = screen.getAllByText('Add more');
      await userEvent.click(addMoreButtons[0]);
      expect(onAddMoreClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('bestTag badge', () => {
    it('renders the bestTag badge when bestTag=true', () => {
      renderModal([COLUMN_1]);

      expect(screen.getByText('Best')).toBeInTheDocument();
    });

    it('does not render the bestTag badge when bestTag=false', () => {
      renderModal([COLUMN_2]);

      expect(screen.queryByText('Best')).not.toBeInTheDocument();
    });
  });

  describe('column count validation', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
      errorSpy.mockClear();
    });

    afterAll(() => {
      errorSpy.mockRestore();
    });

    it('emits console.error and slices when more than 3 columns are provided', () => {
      const extraColumn: BpkCompareColumn = {
        itemId: 'col-4',
        headerContent: <div>Extra column</div>,
        rows: BASE_ROWS,
        removeA11yLabel: 'Remove extra',
      };

      renderModal([COLUMN_1, COLUMN_2, COLUMN_3, extraColumn]);

      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('maximum is 3'),
      );
      expect(screen.queryByText('Extra column')).not.toBeInTheDocument();
    });
  });

  describe('modal open/close', () => {
    it('renders content when isOpen=true', () => {
      renderModal([COLUMN_1]);

      expect(screen.getByText('Column 1 header')).toBeInTheDocument();
    });

    it('fires onClose when the close trigger is activated', async () => {
      const onClose = jest.fn();
      renderWithProvider(
        <BpkCompareModal.Root isOpen onClose={onClose}>
          <BpkCompareModal.Header translations={TRANSLATIONS} />
          <BpkCompareModal.Content
            columns={[COLUMN_1]}
            onRemove={noop}
            onAddMoreClick={noop}
            translations={TRANSLATIONS}
          />
        </BpkCompareModal.Root>,
      );

      await userEvent.click(screen.getByLabelText('Close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
