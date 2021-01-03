/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import BpkCalendarDate, { CELL_TYPES } from './BpkCalendarDate';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendarDate', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkCalendarDate date={new Date(2010, 1, 15)} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const tree = renderer
      .create(<BpkCalendarDate date={new Date(2010, 1, 15)} disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with a click and keyDown handler', () => {
    const tree = renderer
      .create(
        <BpkCalendarDate
          date={new Date(2010, 1, 15)}
          onClick={() => null}
          onKeyDown={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a focused button with tabIndex', () => {
    const tree = renderer
      .create(<BpkCalendarDate date={new Date(2010, 1, 15)} focused />, {
        createNodeMock,
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass props through to button', () => {
    const tree = renderer
      .create(
        <BpkCalendarDate
          date={new Date(2010, 1, 15)}
          aria-label="Nothing happened on this day in 2010"
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should set a custom class', () => {
    const tree = renderer
      .create(
        <BpkCalendarDate
          date={new Date(2010, 1, 15)}
          className="userlandClassName"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('cellType tests', () => {
    it('should render correctly with default style', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.default}
            date={new Date(2010, 1, 15)}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with positive style', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.positive}
            date={new Date(2010, 1, 15)}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with neutral style', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.neutral}
            date={new Date(2010, 1, 15)}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with negative style', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.negative}
            date={new Date(2010, 1, 15)}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render a disabled button', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.default}
            date={new Date(2010, 1, 15)}
            disabled
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render a focused button with tabIndex', () => {
      const tree = renderer
        .create(
          <BpkCalendarDate
            cellType={CELL_TYPES.default}
            date={new Date(2010, 1, 15)}
            focused
          />,
          {
            createNodeMock,
          },
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
