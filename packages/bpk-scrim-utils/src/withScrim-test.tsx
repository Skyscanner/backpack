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
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import focusScope from 'a11y-focus-scope';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import focusStore from 'a11y-focus-store';

import {
  fixBody,
  lockScroll,
  restoreScroll,
  storeScroll,
  unfixBody,
  unlockScroll,
} from './scroll-utils';
import withScrim from './withScrim';

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
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
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
      jest.runAllTimers();
      expect(storeScroll).toHaveBeenCalled();
      expect(lockScroll).toHaveBeenCalled();
      expect(fixBody).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(mockSetAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
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
      jest.runAllTimers();
      expect(lockScroll).toHaveBeenCalled();
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(storeScroll).not.toHaveBeenCalled();
      expect(fixBody).not.toHaveBeenCalled();
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

    it('should unmount correctly when is iPhone', async () => {
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
      expect(focusStore.restoreFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
      expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-hidden');
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(restoreScroll).toHaveBeenCalled();
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
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(focusScope.unscopeFocus).toHaveBeenCalled();
      expect(mockRemoveAttribute).toHaveBeenCalledWith('aria-hidden');
    });
  });
});
