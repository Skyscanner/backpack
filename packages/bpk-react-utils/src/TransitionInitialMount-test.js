import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


import TransitionInitialMount from './TransitionInitialMount';

describe('TransitionInitialMount', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <TransitionInitialMount
        appearClassName="block--appear"
        appearActiveClassName="block--apear-active"
        transitionTimeout={250}
      >
        <p>My transition</p>
      </TransitionInitialMount>,
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
});
