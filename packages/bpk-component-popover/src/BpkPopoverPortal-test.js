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

import React from 'react';
import Shallow from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

jest.mock(
  '@skyscanner/popper.js',
  () =>
    class Popper {
      constructor(target, popover, options) {
        options.onCreate();
      }

      scheduleUpdate = () => {};

      destroy = () => {};
    },
);
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
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkPopoverPortal
          id="my-popover"
          target={<div>target</div>}
          isOpen={false}
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should not render anything if target is a function', () => {
    const tree = renderer
      .create(
        <BpkPopoverPortal
          id="my-popover"
          // Ignoring this warning because Flow doesn't yet support a secondary
          // argument for document.createElement.
          // $FlowFixMe
          target={() => document.createElement('button', { type: 'button' })}
          isOpen={false}
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Custom Portal props', () => {
    // Changing the props of the <Portal> component will not affect the rendered
    // output. Thus we need to do shallow rendering to test the correct props
    // are passed to the <Portal> component.

    it('should render correctly with portalClassName added to portal component', () => {
      const shallowRenderer = Shallow.createRenderer();
      const result = shallowRenderer.render(
        <BpkPopoverPortal
          id="my-popover"
          target={<div>target</div>}
          isOpen={false}
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          portalClassName="my-custom-classname"
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      );
      expect(result).toMatchSnapshot();
    });

    it('should render correctly with portalStyle added to portal component', () => {
      const shallowRenderer = Shallow.createRenderer();
      const customStyle: ?Object = { color: 'red' }; // eslint-disable-line  backpack/use-tokens
      const result = shallowRenderer.render(
        <BpkPopoverPortal
          id="my-popover"
          target={<div>target</div>}
          isOpen={false}
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          portalStyle={customStyle}
        >
          <div>My popover content</div>
        </BpkPopoverPortal>,
      );

      expect(result).toMatchSnapshot();
    });
  });

  it('should trap and restore focus', () => {
    const focusStore = require('a11y-focus-store'); // eslint-disable-line global-require
    const focusScope = require('a11y-focus-scope'); // eslint-disable-line global-require

    const portal = mount(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(portal.instance().popper).toBeNull();
    expect(focusStore.storeFocus).not.toHaveBeenCalled();
    expect(focusScope.scopeFocus).not.toHaveBeenCalled();
    expect(focusStore.restoreFocus).not.toHaveBeenCalled();
    expect(focusScope.unscopeFocus).not.toHaveBeenCalled();

    portal.setProps({ isOpen: true }).update();

    expect(focusStore.storeFocus).toHaveBeenCalled();
    expect(focusScope.scopeFocus).toHaveBeenCalled();

    portal.setProps({ isOpen: false }).update();

    expect(focusStore.restoreFocus).toHaveBeenCalled();
    expect(focusScope.unscopeFocus).toHaveBeenCalled();
  });

  it('should reposition when props are updated', () => {
    const portal = mount(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    portal.instance().position = jest.fn();

    portal.setProps({ isOpen: true }).update();
    expect(portal.instance().position.mock.calls.length).toBe(1);

    portal.setProps({ target: <div>another target</div> }).update();
    expect(portal.instance().position.mock.calls.length).toBe(2);
  });

  it('should not reposition if not open', () => {
    const portal = mount(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    portal.instance().position = jest.fn();

    portal.setProps({ isOpen: false }).update();
    expect(portal.instance().position.mock.calls.length).toBe(0);
  });

  it('should not create multiple popper instances when repositioning', () => {
    const portal = mount(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    const { popper } = portal.instance();

    portal.setProps({ target: <div>another target</div> }).update();
    expect(portal.instance().popper).toBe(popper);
  });
});
