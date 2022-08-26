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

import React from 'react';
import { render } from '@testing-library/react';

import BpkCalendarDate from './BpkCalendarDate';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendarDate', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCalendarDate date={new Date(2010, 1, 15)} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const { asFragment } = render(
      <BpkCalendarDate date={new Date(2010, 1, 15)} disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a blocked button as disabled with aria-hidden applied', () => {
    const { asFragment } = render(
      <BpkCalendarDate date={new Date(2010, 1, 15)} isBlocked />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with a click and keyDown handler', () => {
    const { asFragment } = render(
      <BpkCalendarDate
        date={new Date(2010, 1, 15)}
        onClick={() => null}
        onKeyDown={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a focused button with tabIndex', () => {
    const { asFragment } = render(
      <BpkCalendarDate date={new Date(2010, 1, 15)} isFocused />,
      {
        createNodeMock,
      },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass props through to button', () => {
    const { asFragment } = render(
      <BpkCalendarDate
        date={new Date(2010, 1, 15)}
        aria-label="Nothing happened on this day in 2010"
      />,
      { createNodeMock },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set a custom class', () => {
    const { asFragment } = render(
      <BpkCalendarDate
        date={new Date(2010, 1, 15)}
        className="userlandClassName"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
