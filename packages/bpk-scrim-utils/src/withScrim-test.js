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
import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';

import withScrim from './withScrim';
import {
  lockScroll,
  restoreScroll,
  storeScroll,
  unlockScroll,
} from './scroll-utils';

jest.mock('a11y-focus-scope', () => ({
  scopeFocus: jest.fn(),
  unscopeFocus: jest.fn(),
}));
jest.mock('a11y-focus-store', () => ({
  storeFocus: jest.fn(),
  restoreFocus: jest.fn(),
}));
jest.mock('./scroll-utils', () => ({
  lockScroll: jest.fn(),
  restoreScroll: jest.fn(),
  storeScroll: jest.fn(),
  unlockScroll: jest.fn(),
}));

describe('BpkScrim', () => {
  describe('render', () => {
    let TestComponent;
    let Component;

    beforeEach(() => {
      TestComponent = 'TestComponent';
      Component = withScrim(TestComponent);
    });

    it('should render correctly', () => {
      const tree = renderer
        .create(
          <Component
            onClose={jest.fn()}
            getApplicationElement={jest.fn()}
            isIphone={false}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when is iPhone', () => {
      const tree = renderer
        .create(
          <Component
            onClose={jest.fn()}
            getApplicationElement={jest.fn()}
            isIphone
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with containerClassName', () => {
      const tree = renderer
        .create(
          <Component
            onClose={jest.fn()}
            getApplicationElement={jest.fn()}
            containerClassName="containerClassName"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    let TestComponent;
    let Component;

    beforeEach(() => {
      TestComponent = () => <div>TestComponent</div>;
      Component = withScrim(TestComponent);
    });

    it('should mount correctly when is iPhone', () => {
      mount(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({ style: {} }))}
          isIphone
        />,
      );
      expect(storeScroll).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
    });

    it('should mount correctly when is not iPhone', () => {
      const mockSetAttribute = jest.fn();
      mount(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: mockSetAttribute,
          }))}
          isIphone={false}
        />,
      );
      expect(lockScroll).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(mockSetAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
    });
  });

  describe('componentWillUnmount', () => {
    let TestComponent;
    let Component;

    beforeEach(() => {
      TestComponent = () => <div>TestComponent</div>;
      Component = withScrim(TestComponent);
    });

    it('should unmount correctly when is iPhone', () => {
      const instance = mount(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({ style: {} }))}
          isIphone
        />,
      );
      instance.unmount();

      expect(restoreScroll).toHaveBeenCalled();
      expect(focusStore.restoreFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
    });

    it('should unmount correctly when is not iPhone', () => {
      const mockRemoveAttribute = jest.fn();
      const instance = mount(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: jest.fn(),
            removeAttribute: mockRemoveAttribute,
          }))}
          isIphone={false}
        />,
      );
      instance.unmount();

      expect(unlockScroll).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
      expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-hidden');
    });
  });
});
