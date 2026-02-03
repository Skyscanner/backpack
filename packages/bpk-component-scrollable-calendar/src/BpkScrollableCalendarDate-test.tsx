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
// @ts-nocheck

import { render } from '@testing-library/react';

import BpkScrollableCalendarDate from './BpkScrollableCalendarDate';

const testDate = new Date(2010, 1, 15);

describe('BpkScrollableCalendarDate', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate date={testDate} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate date={testDate} disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with a click and keyDown handler', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate
        date={testDate}
        onClick={() => null}
        onKeyDown={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a focused button with tabIndex', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate date={testDate} isFocused />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass props through to button', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate
        date={testDate}
        aria-label="Nothing happened on this day in 2010"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return null when isOutside is true', () => {
    const { asFragment } = render(
      <BpkScrollableCalendarDate date={testDate} isOutside />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
