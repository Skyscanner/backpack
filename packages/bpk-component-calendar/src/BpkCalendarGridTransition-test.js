import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BpkCalendarGridTransition, { addCalendarGridTransition } from './BpkCalendarGridTransition';

const MyComponent = props => <div>{ JSON.stringify(props) }</div>;
const TransitioningMyComponent = addCalendarGridTransition(MyComponent);

describe('BpkCalendar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TransitioningMyComponent
      TransitionComponent={MyComponent}
      minDate={new Date(2009, 1)}
      maxDate={new Date(2011, 1)}
      month={new Date(2010, 1)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should transition to the next month', () => {
    const calendar = shallow(<BpkCalendarGridTransition
      TransitionComponent={MyComponent}
      month={new Date(2010, 1)}
    />);

    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 1));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);

    // Next month
    calendar.setProps({ month: new Date(2010, 2) });
    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 1));
    expect(calendar.state('isTransitioning')).toBe(true);
    expect(calendar.state('transitionValue')).toBe(-588);

    calendar.instance().onMonthTransitionEnd();
    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 2));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);
  });

  it('should transition to the previous month', () => {
    const calendar = shallow(<BpkCalendarGridTransition
      TransitionComponent={MyComponent}
      month={new Date(2010, 1)}
    />);

    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 1));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);

    // Previous month
    calendar.setProps({ month: new Date(2010, 0) });
    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 1));
    expect(calendar.state('isTransitioning')).toBe(true);
    expect(calendar.state('transitionValue')).toBe(0);

    calendar.instance().onMonthTransitionEnd();
    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 0));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);
  });

  it('should jump (without transition) to any other month', () => {
    const calendar = shallow(<BpkCalendarGridTransition
      TransitionComponent={MyComponent}
      month={new Date(2010, 1)}
    />);

    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 1));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);

    // 2 months ahead
    calendar.setProps({ month: new Date(2010, 3) });
    expect(calendar.state('currentMonth')).toEqual(new Date(2010, 3));
    expect(calendar.state('isTransitioning')).toBe(false);
    expect(calendar.state('transitionValue')).toBe(-294);
  });
});
