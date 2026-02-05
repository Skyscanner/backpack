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


import PropTypes from 'prop-types';

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ArrayDataSource } from './DataSource';
import withInfiniteScroll from './withInfiniteScroll';

describe('withInfiniteScroll accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const elementsArray: string[] = [];

    for (let i = 0; i < 5; i += 1) {
      elementsArray.push(`Element ${i}`);
    }

    const List = (props: { elements: string[] }) => (
      <div id="list">
        {props.elements.map((element: string) => (
          <div key={element}>{element}</div>
        ))}
      </div>
    );

    const InfiniteList = withInfiniteScroll(List as React.ComponentType<{ elements: string[] }>);
    const { container } = render(
      <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
