/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkDataTable from './BpkDataTable';
import { Column as BpkColumn } from './BpkColumn';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

const rows = [
  { name: 'Jose', description: 'Software Engineer', bla: 'Bla' },
  { name: 'Rolf', description: 'Some guy', bla: 'Bla' },
];

describe('BpkDataTable', () => {
  it('should render correctly with multiple columns', () => {
    const tree = renderer.create(
      <BpkDataTable rows={rows} height={200}>
        <BpkColumn
          label={'Name'}
          dataKey={'name'}
          width={100}
        />
        <BpkColumn
          label={'Description'}
          dataKey={'description'}
          width={100}
          flexGrow={1}
        />
        <BpkColumn
          label={'Bla'}
          dataKey={'bla'}
          width={100}
        />
      </BpkDataTable>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no data; only headers', () => {
    const tree = renderer.create(
      <BpkDataTable rows={[]} height={200}>
        <BpkColumn
          label={'Name'}
          dataKey={'name'}
          width={100}
        />
        <BpkColumn
          label={'Description'}
          dataKey={'description'}
          width={100}
          flexGrow={1}
        />
        <BpkColumn
          label={'Bla'}
          dataKey={'bla'}
          width={100}
        />
      </BpkDataTable>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly in RTL', () => {
    const tree = renderer.create(
      <BpkDataTable rows={rows} height={200} dir={'rtl'}>
        <BpkColumn
          label={'Name'}
          dataKey={'name'}
          width={100}
        />
        <BpkColumn
          label={'Description'}
          dataKey={'description'}
          width={100}
          flexGrow={1}
        />
        <BpkColumn
          label={'Bla'}
          dataKey={'bla'}
          width={100}
        />
      </BpkDataTable>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

