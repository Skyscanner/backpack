/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import React, { type Element } from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import withNavigationStackState from './withNavigationStackState';

describe('withNavigationStackState', () => {
  const View = () => <div />;

  const Stack = ({ views, ...rest }: { views: Array<Element<any>> }) => (
    <div className="parent" {...rest}>
      {views}
    </div>
  );

  const StackWithCallbacks = ({ views }: { views: Array<Element<any>> }) => (
    <div className="parent">{views}</div>
  );

  it('should render correctly', () => {
    const WithState = withNavigationStackState(Stack);

    const tree = renderer
      .create(
        <WithState
          className="test"
          aria-hidden="false"
          initialViews={[<View key="a" />]}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should assign push and pop callbacks to children', () => {
    const WithState = withNavigationStackState(Stack);

    const wrapper = mount(<WithState initialViews={[<View key="a" />]} />);
    const props = Object.keys(wrapper.find(View).props());
    expect(props).toContain('pushView');
    expect(props).toContain('popView');
  });

  it('should assign push and pop callbacks to Stack if `assignCallbacksToChildren` is false', () => {
    const WithState = withNavigationStackState(StackWithCallbacks, false);

    const wrapper = mount(<WithState initialViews={[<View key="a" />]} />);
    const props = Object.keys(wrapper.find(View).props());
    expect(props).toHaveLength(0);

    const stackProps = Object.keys(wrapper.find(StackWithCallbacks).props());
    expect(stackProps).toContain('pushView');
    expect(stackProps).toContain('popView');
  });

  it('should push views into the stack', () => {
    const WithState = withNavigationStackState(StackWithCallbacks, false);

    const wrapper = mount(<WithState initialViews={[<div key="a" />]} />);
    wrapper.instance().pushView(<div id="b" key="b" />);
    expect(wrapper.getDOMNode().querySelectorAll('.parent #b')).toHaveLength(1);
  });

  it('should pop views from the stack', () => {
    const WithState = withNavigationStackState(StackWithCallbacks, false);

    const wrapper = mount(<WithState initialViews={[<div key="a" />]} />);
    wrapper.instance().pushView(<div id="b" key="b" />);
    wrapper.instance().popView();
    expect(wrapper.getDOMNode().querySelectorAll('.parent #b')).toHaveLength(0);
  });
});
