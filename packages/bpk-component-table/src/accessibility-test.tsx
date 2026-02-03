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


import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkTable from './BpkTable';
import BpkTableBody from './BpkTableBody';
import BpkTableCell from './BpkTableCell';
import BpkTableHead from './BpkTableHead';
import BpkTableHeadCell from './BpkTableHeadCell';
import BpkTableRow from './BpkTableRow';

describe('BpkTable accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkTable>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Heading 1</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 2</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 3</BpkTableHeadCell>
            <BpkTableHeadCell>Heading 4</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>Row 1, Data 1</BpkTableCell>
            <BpkTableCell>Row 1, Data 2</BpkTableCell>
            <BpkTableCell>Row 1, Data 3</BpkTableCell>
            <BpkTableCell>Row 1, Data 4</BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>Row 2, Data 1</BpkTableCell>
            <BpkTableCell>Row 2, Data 2</BpkTableCell>
            <BpkTableCell>Row 2, Data 3</BpkTableCell>
            <BpkTableCell>Row 2, Data 4</BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
