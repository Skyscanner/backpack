import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AnimateHeight from './AnimateHeight';

describe('AnimateHeight', () => {
  it('should render correctly with "height" attribute equal to "auto"', () => {
    const tree = renderer.create(
      <AnimateHeight
        duration={200}
        height="auto"
      >
        Content.
      </AnimateHeight>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "height" attribute equal to "200"', () => {
    const tree = renderer.create(
      <AnimateHeight
        duration={200}
        height={200}
      >
        Content.
      </AnimateHeight>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should set "display: none;" on contentElement if height is 0', () => {
    const tree = mount(
      <AnimateHeight
        duration={0}
        height={0}
      >
        Content.
      </AnimateHeight>,
      { lifecycleExperimental: true }, // See https://github.com/airbnb/enzyme/pull/318
    );

    expect(tree.instance().contentElement.style.display).toEqual('none');

    tree.setProps({ height: 100 }).update();

    expect(tree.instance().contentElement.style.display).toEqual('');
  });
});
