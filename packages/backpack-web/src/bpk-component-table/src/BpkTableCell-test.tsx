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


/*
Note: The tests here are wrapped in table > tr to avoid a validation
warning (that <td> elements must be inside tables) when running tests.
*/

import { render } from '@testing-library/react';

import BpkTableCell from './BpkTableCell';

const defaultClasses = ['bpk-table__cell'];

const renderCell = (props = {}, content = 'Tabular data') => {
  const { getByRole, ...testingLibraryUtils } = render(
    <table>
        <tbody>
          <tr>
            <BpkTableCell {...props}>{content}</BpkTableCell>
          </tr>
        </tbody>
    </table>,
  );
  const cell = getByRole('cell', { name: content });
  return { cell, ...testingLibraryUtils };
};

describe('BpkTableCell', () => {
  it('should render table cell with base class', () => {
    const { cell } = renderCell();

    expect(cell?.tagName).toBe('TD');
    expect(cell).toHaveClass(...defaultClasses);
  });

  it('should apply custom class', () => {
    const className = 'custom-class';
    const expectedClasses = [...defaultClasses, className];

    const { cell } = renderCell({ 
      className 
    });

    expect(cell?.tagName).toBe('TD');
    expect(cell).toHaveClass(...expectedClasses);
  });

  it('should forward arbitrary props', () => {
    const expectedClasses = [...defaultClasses];

    const { cell } = renderCell({
      id: 'custom-id',
      'data-foo': 'bar',
    });

    expect(cell?.tagName).toBe('TD');
    expect(cell).toHaveClass(...expectedClasses);
    expect(cell).toHaveAttribute('id', 'custom-id');
    expect(cell).toHaveAttribute('data-foo', 'bar');
  });

  describe('wordBreak prop', () => {
    it('should not apply wordBreak class by default', () => {
      const expectedClasses = [ ...defaultClasses ];

      // wordBreak prop omitted
      const { cell } = renderCell();

      expect(cell?.tagName).toBe('TD');
      expect(cell).toHaveClass(...expectedClasses);
      expect(cell).not.toHaveClass('bpk-table__cell--wordBreak');
    });

    it('should not apply wordBreak class when wordBreak is false', () => {
      const expectedClasses = [...defaultClasses];

      const { cell } = renderCell({
        wordBreak: false,
      });

      expect(cell?.tagName).toBe('TD');
      expect(cell).toHaveClass(...expectedClasses);
      expect(cell).not.toHaveClass('bpk-table__cell--wordBreak');
    });

    it('should apply wordBreak class when wordBreak is true', () => {
      const expectedClasses = [
        ...defaultClasses,
        'bpk-table__cell--wordBreak'
      ];

      const { cell } = renderCell({
        wordBreak: true,
      });

      expect(cell?.tagName).toBe('TD');
      expect(cell).toHaveClass(...expectedClasses);
    });
  });
});
