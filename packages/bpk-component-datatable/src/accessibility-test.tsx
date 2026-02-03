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

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

describe('BpkDataTable accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkDataTable rows={rows} height="12.5rem" columns={[
        { label: 'Name', accessor: 'name', width: '6.25rem' },
        { label: 'Description', accessor: 'description', width: '6.25rem', flexGrow: 1 },
        { label: 'Bla', accessor: 'bla', width: '6.25rem' },
      ]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
