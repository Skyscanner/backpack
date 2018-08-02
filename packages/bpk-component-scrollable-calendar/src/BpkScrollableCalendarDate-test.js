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
import BpkScrollableCalendarDate from './BpkScrollableCalendarDate';

const testDate = new Date(2010, 1, 15);

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkScrollableCalendarDate', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkScrollableCalendarDate date={testDate} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const tree = renderer
      .create(<BpkScrollableCalendarDate date={testDate} disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with a click and keyDown handler', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendarDate
          date={testDate}
          onClick={() => null}
          onKeyDown={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a focused button with tabIndex', () => {
    const tree = renderer
      .create(<BpkScrollableCalendarDate date={testDate} focused />, {
        createNodeMock,
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass props through to button', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendarDate
          date={testDate}
          aria-label="Nothing happened on this day in 2010"
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return null when isOutside is true', () => {
    const tree = renderer
      .create(<BpkScrollableCalendarDate date={testDate} isOutside />, {
        createNodeMock,
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
