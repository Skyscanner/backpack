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
import userEvent from '@testing-library/user-event';

import BpkPagination from './BpkPagination';

describe('BpkPagination', () => {
  it('should display forward nudger', () => {
    render(
      <BpkPagination
        pageCount={20}
        selectedPageIndex={0}
        previousLabel="previous"
        nextLabel="next"
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    const nextButton = screen.getByRole('button', { name: 'next' });

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveAttribute('disabled');
  });

  it('should not display forward nudger when on last page', () => {
    render(
      <BpkPagination
        pageCount={2}
        selectedPageIndex={1}
        previousLabel="previous"
        nextLabel="next"
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    const nextButton = screen.getByRole('button', { name: 'next' });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute('disabled');
  });

  it('should display backward nudger when not on the first page', () => {
    render(
      <BpkPagination
        pageCount={20}
        selectedPageIndex={1}
        previousLabel="previous"
        nextLabel="next"
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    const previousButton = screen.getByRole('button', { name: 'previous' });
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toHaveAttribute('disabled');
  });

  it('should not display backward nudger when on first page', () => {
    render(
      <BpkPagination
        pageCount={20}
        selectedPageIndex={0}
        previousLabel="previous"
        nextLabel="next"
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    const previousButton = screen.getByRole('button', { name: 'previous' });

    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toHaveAttribute('disabled');
  });

  it("should call the 'onPageChange' callback when page is selected", async () => {
    const onPageChange = jest.fn();
    render(
      <BpkPagination
        pageCount={20}
        selectedPageIndex={0}
        previousLabel="previous"
        nextLabel="next"
        onPageChange={onPageChange}
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    expect(onPageChange.mock.calls.length).toBe(0);

    const pageButton = screen.getByText('3');
    await userEvent.click(pageButton);

    expect(onPageChange.mock.calls.length).toBe(1);
  });

  it("should call the 'onPageChange' callback when nudger is clicked", async () => {
    const onPageChange = jest.fn();
    render(
      <BpkPagination
        pageCount={20}
        selectedPageIndex={0}
        previousLabel="previous"
        nextLabel="next"
        onPageChange={onPageChange}
        paginationLabel="Pagination Navigation"
        pageLabel={(page, isSelected) =>
          `Go to page ${page}${isSelected ? ', this is the current page' : ''}.`
        }
      />,
    );

    expect(onPageChange.mock.calls.length).toBe(0);

    const nextButton = screen.getByRole('button', { name: 'next' });
    await userEvent.click(nextButton);

    expect(onPageChange.mock.calls.length).toBe(1);
  });
});
