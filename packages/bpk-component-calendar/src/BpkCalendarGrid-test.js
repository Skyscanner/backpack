jest.mock('./utils');

/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import BpkCalendarGrid from './BpkCalendarGrid';
/* eslint-enable */

describe('BpkCalendarGrid', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendarGrid />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "month" attribute', () => {
    const tree = renderer.create(<BpkCalendarGrid month="2016-12" />).toJSON();
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

  it('should render correctly with a "dayModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const tree = renderer.create(
      <BpkCalendarGrid dayModifiers={modifiers} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
