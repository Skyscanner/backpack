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

/* @flow strict */

import { createRef } from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@popperjs/core', () => {
  const originalModule = jest.requireActual('@popperjs/core');
  return {
    ...originalModule,
    createPopper: jest
      .fn()
      .mockReturnValue({
        update: jest.fn(),
        destroy: jest.fn(),
      })
      .mockImplementation((target, popover, options) =>
        options.onFirstUpdate(),
      ),
  };
});
jest.mock('a11y-focus-store', () => ({
  storeFocus: jest.fn(),
  restoreFocus: jest.fn(),
}));
jest.mock('a11y-focus-scope', () => ({
  scopeFocus: jest.fn(),
  unscopeFocus: jest.fn(),
}));

// eslint-disable-next-line import/first
import BpkPopoverPortal from './BpkPopoverPortal';

describe('BpkPopoverPortal', () => {
  afterEach(() => jest.clearAllMocks());

  it('should render correctly', () => {
    const ref = createRef();

    const { asFragment } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render anything if target is a function', () => {
    const { asFragment } = render(
      <BpkPopoverPortal
        id="my-popover"
        // Ignoring this warning because Flow doesn't yet support a secondary
        // argument for document.createElement.
        // $FlowFixMe[incompatible-call]
        target={() => document.createElement('button', { type: 'button' })}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Custom Portal props', () => {
    // Changing the props of the <Portal> component will not affect the rendered
    // output. Thus we need to do shallow rendering to test the correct props
    // are passed to the <Portal> component.

    it('should render correctly with portalClassName added to portal component', () => {
      const ref = createRef();

      render(
        <BpkPopoverPortal
          id="my-popover"
          target={<div ref={ref}>target</div>}
          isOpen
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          portalClassName="my-custom-classname"
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      );

      expect(
        document.getElementsByClassName(
          'bpk-popover-portal my-custom-classname',
        ).length,
      ).toBe(1);
    });

    it('should render correctly with portalStyle added to portal component', () => {
      const customStyle: ?Object = { color: 'red' }; // eslint-disable-line  backpack/use-tokens
      const ref = createRef();

      render(
        <BpkPopoverPortal
          id="my-popover"
          target={<div ref={ref}>target</div>}
          isOpen
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          portalStyle={customStyle}
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      );

      expect(
        document.getElementsByClassName('bpk-popover-portal')[0],
      ).toHaveStyle(customStyle);
    });
  });

  it('should trap and restore focus', () => {
    const focusStore = require('a11y-focus-store'); // eslint-disable-line global-require
    const keyboardFocusScope = require('./keyboardFocusScope').default; // eslint-disable-line global-require
    keyboardFocusScope.scopeFocus = jest.fn();
    keyboardFocusScope.unscopeFocus = jest.fn();

    const ref = createRef();

    const { rerender } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(focusStore.storeFocus).not.toHaveBeenCalled();
    expect(keyboardFocusScope.scopeFocus).not.toHaveBeenCalled();
    expect(focusStore.restoreFocus).not.toHaveBeenCalled();
    expect(keyboardFocusScope.unscopeFocus).not.toHaveBeenCalled();

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(focusStore.storeFocus).toHaveBeenCalled();
    expect(keyboardFocusScope.scopeFocus).toHaveBeenCalled();

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(focusStore.restoreFocus).toHaveBeenCalled();
    expect(keyboardFocusScope.unscopeFocus).toHaveBeenCalled();
  });

  it('should reposition when props are updated', () => {
    const positionSpy = jest.spyOn(BpkPopoverPortal.prototype, 'position');
    const ref = createRef();

    const { rerender } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(positionSpy).toHaveBeenCalledTimes(1);

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>another target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );
    expect(positionSpy).toHaveBeenCalledTimes(2);
  });

  it('should not reposition if not open', () => {
    const positionSpy = jest.spyOn(BpkPopoverPortal.prototype, 'position');
    const ref = createRef();

    const { rerender } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(positionSpy.mock.calls.length).toBe(1);

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(positionSpy.mock.calls.length).toBe(1);
  });

  it('should not create multiple popper instances when repositioning', () => {
    const popperJS = require('@popperjs/core'); // eslint-disable-line global-require
    popperJS.createPopper = jest.fn();
    popperJS.createPopper.mockReturnValue({
      update: jest.fn(),
      destroy: jest.fn(),
    });

    const ref = createRef();

    const { rerender } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(popperJS.createPopper).toHaveBeenCalledTimes(1);

    rerender(
      <BpkPopoverPortal
        id="my-popover"
        target={<div ref={ref}>another target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(popperJS.createPopper).toHaveBeenCalledTimes(1);
  });
});
