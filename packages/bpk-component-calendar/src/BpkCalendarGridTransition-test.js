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
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import BpkCalendarGridTransition, {
  addCalendarGridTransition,
} from './BpkCalendarGridTransition';

const MyComponent = props => <div>{JSON.stringify(props)}</div>;
const TransitioningMyComponent = addCalendarGridTransition(MyComponent);

describe('BpkCalendar', () => {
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

  it('should transition to the next month', () => {
    const calendar = shallow(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 1)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');

    // Next month
    calendar.setProps({ month: new Date(Date.UTC(2010, 2)) });
    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 2)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');
  });

  it('should transition to the previous month', () => {
    const calendar = shallow(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 1)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');

    // Previous month
    calendar.setProps({ month: new Date(Date.UTC(2010, 0)) });
    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 0)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');
  });

  it('should jump (without transition) to any other month', () => {
    const calendar = shallow(
      <BpkCalendarGridTransition
        TransitionComponent={MyComponent}
        month={new Date(Date.UTC(2010, 1))}
      />,
    );

    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 1)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');

    // 2 months ahead
    calendar.setProps({ month: new Date(Date.UTC(2010, 3)) });
    expect(calendar.state('currentMonth')).toEqual(new Date(Date.UTC(2010, 3)));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe('-15.75rem');
  });
});
