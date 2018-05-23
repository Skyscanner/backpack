/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { addCalendarScrollGridList } from './BpkCalendarScrollGridList';

const MyComponent = props => <div>{JSON.stringify(props)}</div>;
const ScrollMyComponent = addCalendarScrollGridList(MyComponent);

describe('BpkCalendarScroll', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <ScrollMyComponent
          ScrollingComponent={MyComponent}
          minDate={new Date(Date.UTC(2009, 1))}
          maxDate={new Date(Date.UTC(2011, 1))}
          month={new Date(Date.UTC(2010, 1))}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
