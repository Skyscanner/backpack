/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import BpkToast from './BpkToast';

describe('BpkToast', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkToast
        message="Your toast is ready"
        isVisible
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it has a className', () => {
    const tree = renderer.create(
      <BpkToast
        className="my-toast"
        message="Your toast is ready"
        isVisible
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should close on close button click', () => {
    const toast = mount(<BpkToast
      message="Your toast is ready"
      isVisible
    />);

    expect(toast.state('isOpen')).toEqual(true);

    toast.find('.bpk-toast__card-close-button').simulate('click');
    expect(toast.state('isOpen')).toEqual(false);
  });

  it('should close on card click', () => {
    const toast = mount(<BpkToast
      message="Your toast is ready"
      isVisible
    />);

    expect(toast.state('isOpen')).toEqual(true);

    toast.find('.bpk-toast__card').simulate('click');
    expect(toast.state('isOpen')).toEqual(false);
  });
});
