import React from 'react';
import renderer from 'react-test-renderer';
import BpkCalendarDate from './BpkCalendarDate';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendarDate', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendarDate
      date={new Date(2010, 1, 15)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    const tree = renderer.create(<BpkCalendarDate
      date={new Date(2010, 1, 15)}
      disabled
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with a click and keyDown handler', () => {
    const tree = renderer.create(<BpkCalendarDate
      date={new Date(2010, 1, 15)}
      onClick={() => null}
      onKeyDown={() => null}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a focused button with tabIndex', () => {
    const tree = renderer.create(<BpkCalendarDate
      date={new Date(2010, 1, 15)}
      focused
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass props through to button', () => {
    const tree = renderer.create(<BpkCalendarDate
      date={new Date(2010, 1, 15)}
      aria-label="Nothing happened on this day in 2010"
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
