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

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import updateOnDirectionChange from './updateOnDirectionChange';
import { DIRECTION_CHANGE_EVENT, getHtmlElement } from './utils';

const EnhancedComponent = updateOnDirectionChange('div');

describe('BpkRtlToggle', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EnhancedComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should force an update when receiving a direction change event', () => {
    const component = mount(<EnhancedComponent />);
    const forceUpdateSpy = jest.fn();

    component.instance().forceUpdate = forceUpdateSpy;
    expect(forceUpdateSpy).not.toHaveBeenCalled();

    getHtmlElement().dispatchEvent(new Event(DIRECTION_CHANGE_EVENT));
    expect(forceUpdateSpy).toHaveBeenCalled();
  });
});
