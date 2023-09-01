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

import BpkDataTable from './BpkDataTable';
import BpkDataTableColumn from './BpkDataTableColumn';

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

describe('BpkDataTable accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkDataTable rows={rows} height="12.5rem">
        <BpkDataTableColumn label="Name" dataKey="name" width="6.25rem" />
        <BpkDataTableColumn
          label="Description"
          dataKey="description"
          width="6.25rem"
          flexGrow={1}
        />
        <BpkDataTableColumn label="Bla" dataKey="bla" width="6.25rem" />
      </BpkDataTable>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
