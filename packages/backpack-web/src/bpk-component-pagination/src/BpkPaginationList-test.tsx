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
import '@testing-library/jest-dom';

import BpkPaginationList from './BpkPaginationList';

describe('BpkPaginationList', () => {
  it('should display first 3 pages when the first page is selected', () => {
    render(
      <BpkPaginationList
        pageCount={20}
        selectedPageIndex={0}
        visibleRange={3}
        onPageChange={() => null}
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? '. This is the current page' : ''}.`
        }
      />,
    );

    [1, 2, 3].forEach((pageNumber) =>
      expect(
        screen.getByLabelText(`Go to page ${pageNumber}.`, { exact: false }),
      ).toBeInTheDocument(),
    );
  });

  it('should display two ellipses when the 6th page is selected', () => {
    render(
      <BpkPaginationList
        pageCount={20}
        selectedPageIndex={5}
        visibleRange={3}
        onPageChange={() => null}
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    const ellipses = screen.getAllByText('...');
    expect(ellipses).toHaveLength(2);
  });

  it('should display all pages when there are only 4 pages', () => {
    render(
      <BpkPaginationList
        pageCount={4}
        selectedPageIndex={0}
        visibleRange={3}
        onPageChange={() => null}
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? '. This is the current page' : ''}.`
        }
      />,
    );

    [1, 2, 3, 4].forEach((pageNumber) =>
      expect(
        screen.getByLabelText(`Go to page ${pageNumber}.`, { exact: false }),
      ).toBeInTheDocument(),
    );
  });
});
