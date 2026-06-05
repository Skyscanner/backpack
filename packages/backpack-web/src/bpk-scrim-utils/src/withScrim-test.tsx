/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import type { ComponentType } from 'react';

import { render } from '@testing-library/react';

import focusScope from './focusScope';
import focusStore from './focusStore';
import {
  fixBody,
  lockScroll,
  lockTouchAction,
  restoreScroll,
  storeScroll,
  unfixBody,
  unlockScroll,
  unlockTouchAction,
} from './scroll-utils';
import withScrim from './withScrim';

jest.mock('./focusScope', () => ({
  __esModule: true,
  default: {
    scopeFocus: jest.fn(),
    unscopeFocus: jest.fn(),
  },
}));

jest.mock('./focusStore', () => ({
  __esModule: true,
  default: {
    storeFocus: jest.fn(),
    restoreFocus: jest.fn(),
  },
}));

jest.mock('./scroll-utils', () => ({
  lockScroll: jest.fn(),
  lockTouchAction: jest.fn(),
  restoreScroll: jest.fn(),
  storeScroll: jest.fn(),
  unlockScroll: jest.fn(),
  unlockTouchAction: jest.fn(),
  fixBody: jest.fn(),
  unfixBody: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});
describe('BpkScrim', () => {
  describe('render', () => {
    let TestComponent: ComponentType<any> | string;
    let Component: ComponentType<any>;

    beforeEach(() => {
      TestComponent = 'TestComponent';
      Component = withScrim(TestComponent);
    });

    it('should render correctly', () => {
      const { asFragment } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn()}
          isIphone={false}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly when is iPhone', () => {
      const { asFragment } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn()}
          isIphone
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with containerClassName', () => {
      const { asFragment } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn()}
          containerClassName="containerClassName"
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with closeOnScrimClick as false', () => {
      const { asFragment } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn()}
          closeOnScrimClick={false}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    let TestComponent: ComponentType<any> | string;
    let Component: ComponentType<any>;

    beforeEach(() => {
      TestComponent = () => <div>TestComponent</div>;
      Component = withScrim(TestComponent);
    });

    it('should mount correctly when is iPhone', () => {
      const mockSetAttribute = jest.fn();
      const mockRemoveAttribute = jest.fn();
      render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: mockSetAttribute,
            removeAttribute: mockRemoveAttribute,
          }))}
          isIphone
        />,
      );
      expect(storeScroll).toHaveBeenCalled();
      expect(lockScroll).toHaveBeenCalled();
      expect(fixBody).toHaveBeenCalled();
      expect(lockTouchAction).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(mockSetAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
    });

    it('should call storeScroll and fixBody synchronously before lockScroll on iPhone', () => {
      render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
          }))}
          isIphone
        />,
      );
      const storeScrollOrder = (storeScroll as jest.Mock).mock
        .invocationCallOrder[0];
      const fixBodyOrder = (fixBody as jest.Mock).mock.invocationCallOrder[0];
      const lockScrollOrder = (lockScroll as jest.Mock).mock
        .invocationCallOrder[0];
      expect(storeScrollOrder).toBeLessThan(fixBodyOrder);
      expect(fixBodyOrder).toBeLessThan(lockScrollOrder);
    });

    it('should mount correctly when is not iPhone', () => {
      const mockSetAttribute = jest.fn();
      const mockRemoveAttribute = jest.fn();
      render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: mockSetAttribute,
            removeAttribute: mockRemoveAttribute,
          }))}
          isIphone={false}
        />,
      );
      expect(lockScroll).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(storeScroll).not.toHaveBeenCalled();
      expect(fixBody).not.toHaveBeenCalled();
      expect(lockTouchAction).not.toHaveBeenCalled();
      expect(mockSetAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
    });
  });

  describe('componentWillUnmount', () => {
    let TestComponent: ComponentType<any> | string;
    let Component: ComponentType<any>;

    beforeEach(() => {
      TestComponent = () => <div>TestComponent</div>;
      Component = withScrim(TestComponent);
    });

    it('should unmount correctly when is iPhone', () => {
      const mockSetAttribute = jest.fn();
      const mockRemoveAttribute = jest.fn();
      const { unmount } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: mockSetAttribute,
            removeAttribute: mockRemoveAttribute,
          }))}
          isIphone
        />,
      );
      unmount();

      expect(unlockScroll).toHaveBeenCalled();
      expect(unfixBody).toHaveBeenCalled();
      expect(restoreScroll).toHaveBeenCalled();
      expect(unlockTouchAction).toHaveBeenCalled();
      expect(focusStore.restoreFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
      expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-hidden');
    });

    it('should call unfixBody before restoreScroll on iPhone unmount', () => {
      const { unmount } = render(
        <Component
          onClose={jest.fn()}
          getApplicationElement={jest.fn(() => ({
            style: {},
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
          }))}
          isIphone
        />,
      );
      unmount();

      const unfixBodyOrder = (unfixBody as jest.Mock).mock
        .invocationCallOrder[0];
      const restoreScrollOrder = (restoreScroll as jest.Mock).mock
        .invocationCallOrder[0];
      expect(unfixBodyOrder).toBeLessThan(restoreScrollOrder);
    });

    it('should unmount correctly when is not iPhone', () => {
      const mockRemoveAttribute = jest.fn();
      const { unmount } = render(
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
      unmount();

      expect(unlockScroll).toHaveBeenCalled();
      expect(restoreScroll).not.toHaveBeenCalled();
      expect(unfixBody).not.toHaveBeenCalled();
      expect(unlockTouchAction).not.toHaveBeenCalled();
      expect(focusStore.restoreFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
      expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-hidden');
    });
  });
});
