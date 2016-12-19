import React from 'react';
import renderer from 'react-test-renderer';
import isWeekend from 'date-fns/is_weekend';

import BpkCalendarGrid from './BpkCalendarGrid';

describe('BpkCalendarGrid', () => {
  it('should render correctly with a "month" attribute', () => {
    const tree = renderer.create(<BpkCalendarGrid month={new Date('2016-10')} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "weekDays" attribute', () => {
    const tree = renderer.create(
      <BpkCalendarGrid weekDays={['M', 'T', 'W', 'T', 'F', 'S', 'S']} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "weekStartsOn" attribute', () => {
    const tree = renderer.create(<BpkCalendarGrid weekStartsOn={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const tree = renderer.create(
      <BpkCalendarGrid dateModifiers={modifiers} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "showWeekendSeparator" attribute', () => {
    const tree = renderer.create(<BpkCalendarGrid showWeekendSeparator />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom date component', () => {
    const MyCustomDate = (props) => {
      const cx = {
        backgroundColor: 'rgb(255, 84, 82)',
        width: '50%',
        height: '50%',
        borderRadius: '5rem',
        margin: '25%',
      };
      if (isWeekend(props.date)) { cx.backgroundColor = 'rgb(0, 215, 117)'; }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: React.PropTypes.instanceOf(Date).isRequired,
    };
    const tree = renderer.create(
      <BpkCalendarGrid
        showWeekendSeparator
        getDateComponent={() => MyCustomDate}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
