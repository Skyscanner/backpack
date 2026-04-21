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
import userEvent from '@testing-library/user-event';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCompareModal from './BpkCompareModal';

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
  <span key="cancellation">Free cancellation</span>,
  <span key="stars">3.5 stars</span>,
];

const TRANSLATIONS = {
  closeLabel: 'Close',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare',
  addMoreLinkText: 'Add more',
};

type ColumnDef = {
  itemId: string;
  header: ReactElement;
  rows: ReactElement[];
  removeA11yLabel: string;
  bestTag?: boolean;
  onRemove?: () => void;
};

const COLUMN_1: ColumnDef = {
  itemId: 'col-1',
  header: <div>Column 1 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 1',
  bestTag: true,
};

const COLUMN_2: ColumnDef = {
  itemId: 'col-2',
  header: <div>Column 2 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 2',
};

const COLUMN_3: ColumnDef = {
  itemId: 'col-3',
  header: <div>Column 3 header</div>,
  rows: BASE_ROWS,
  removeA11yLabel: 'Remove column 3',
};

const renderModal = (
  columns: ColumnDef[],
  overrides: { onAddMoreClick?: () => void } = {},
) =>
  renderWithProvider(
    <BpkCompareModal.Root isOpen onClose={noop}>
      <BpkCompareModal.Header translations={TRANSLATIONS} />
      <BpkCompareModal.Content
        onAddMoreClick={overrides.onAddMoreClick ?? noop}
        translations={TRANSLATIONS}
      >
        {columns.map((column) => (
          <BpkCompareModal.Column
            key={column.itemId}
            itemId={column.itemId}
            onRemove={column.onRemove ?? noop}
            removeA11yLabel={column.removeA11yLabel}
          >
            <BpkCompareModal.ColumnHeader
              bestTag={column.bestTag}
            >
              {column.header}
            </BpkCompareModal.ColumnHeader>
            <BpkCompareModal.Rows rows={column.rows} />
          </BpkCompareModal.Column>
        ))}
      </BpkCompareModal.Content>
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

  describe('row rendering', () => {
    it('renders row cells in the table body', () => {
      renderModal([COLUMN_1]);

      expect(screen.getByText('Free cancellation')).toBeInTheDocument();
      expect(screen.getByText('3.5 stars')).toBeInTheDocument();
    });
  });

  describe('onRemove callback', () => {
    it('fires onRemove when Remove is clicked for the correct column', () => {
      const onRemoveCol1 = jest.fn();
      const onRemoveCol2 = jest.fn();

      renderModal([
        { ...COLUMN_1, onRemove: onRemoveCol1 },
        { ...COLUMN_2, onRemove: onRemoveCol2 },
      ]);

      fireEvent.click(screen.getByLabelText('Remove column 1'));
      expect(onRemoveCol1).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByLabelText('Remove column 2'));
      expect(onRemoveCol2).toHaveBeenCalledTimes(1);
    });
  });

  describe('onAddMoreClick callback', () => {
    it('fires onAddMoreClick when the Add more button is clicked', () => {
      const onAddMoreClick = jest.fn();
      renderModal([COLUMN_1], { onAddMoreClick });

      const addMoreButtons = screen.getAllByText('Add more');
      fireEvent.click(addMoreButtons[0]);
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

  describe('max columns validation', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
      errorSpy.mockClear();
    });

    afterAll(() => {
      errorSpy.mockRestore();
    });

    it('emits console.error and slices when more than 3 columns are provided', () => {
      renderModal([
        COLUMN_1,
        COLUMN_2,
        COLUMN_3,
        { itemId: 'col-4', header: <div>Extra column</div>, rows: BASE_ROWS, removeA11yLabel: 'Remove extra' },
      ]);

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
          <BpkCompareModal.Content onAddMoreClick={noop} translations={TRANSLATIONS}>
            <BpkCompareModal.Column
              itemId="col-1"
              onRemove={noop}
              removeA11yLabel="Remove column 1"
            >
              <BpkCompareModal.ColumnHeader>
              <div>Column 1 header</div>
            </BpkCompareModal.ColumnHeader>
              <BpkCompareModal.Rows rows={BASE_ROWS} />
            </BpkCompareModal.Column>
          </BpkCompareModal.Content>
        </BpkCompareModal.Root>,
      );

      await userEvent.click(screen.getByLabelText('Close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
