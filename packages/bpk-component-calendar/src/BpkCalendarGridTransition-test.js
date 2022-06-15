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
import '@testing-library/jest-dom';

import BpkCalendarGridTransition, {
  addCalendarGridTransition,
} from './BpkCalendarGridTransition';

const MyComponent = (props) => <div>{JSON.stringify(props)}</div>;
const TransitioningMyComponent = addCalendarGridTransition(MyComponent);

describe('BpkCalendar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(
      <TransitioningMyComponent
        TransitionComponent={MyComponent}
        minDate={new Date(Date.UTC(2009, 1))}
        maxDate={new Date(Date.UTC(2011, 1))}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should transition to the next month', async () => {
    const onMonthTransitionEndSpy = jest.spyOn(
      BpkCalendarGridTransition.prototype,
      'onMonthTransitionEnd',
    );

    const { rerender } = render(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    rerender(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 2))}
      />,
    );

    expect(onMonthTransitionEndSpy).toHaveBeenCalledTimes(1);
  });

  it('should transition to the previous month', () => {
    const onMonthTransitionEndSpy = jest.spyOn(
      BpkCalendarGridTransition.prototype,
      'onMonthTransitionEnd',
    );

    const { rerender } = render(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    rerender(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 0))}
      />,
    );

    expect(onMonthTransitionEndSpy).toHaveBeenCalledTimes(1);
  });

  it('should jump (without transition) to any other month', () => {
    const onMonthTransitionEndSpy = jest.spyOn(
      BpkCalendarGridTransition.prototype,
      'onMonthTransitionEnd',
    );

    const { rerender } = render(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    rerender(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 3))}
      />,
    );

    expect(onMonthTransitionEndSpy).not.toHaveBeenCalled();
  });
});
