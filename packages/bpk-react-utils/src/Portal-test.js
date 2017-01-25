import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Portal from './Portal';

describe('Portal', () => {
  it('should render correctly with no target', () => {
    const tree = renderer.create(
      <Portal isOpen={false}>
        <div>My portal content</div>
      </Portal>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with target', () => {
    const tree = renderer.create(
      <Portal isOpen={false} target={<div>Target</div>}>
        <div>My portal content</div>
      </Portal>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render portal children to document.body', (done) => {
    const firstAssertion = () => {
      expect(document.body.lastChild.textContent).toEqual('My portal content');
      done();
    };

    mount(
      <Portal isOpen onOpen={firstAssertion}>
        <div>My portal content</div>
      </Portal>,
    );
  });
});

