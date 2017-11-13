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
import Shallow from 'react-test-renderer/shallow';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { storeFocus, restoreFocus, scopeFocus, unscopeFocus } from 'bpk-scrim-utils';

import BpkPopoverPortal from './BpkPopoverPortal';

jest.mock('bpk-tether');
jest.mock('bpk-scrim-utils', () => ({
  storeFocus: jest.fn(),
  restoreFocus: jest.fn(),
  scopeFocus: jest.fn(),
  unscopeFocus: jest.fn(),
}));

describe('BpkPopoverPortal', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
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
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should not render anything if target is a function', () => {
    const tree = renderer.create(
      <BpkPopoverPortal
        id="my-popover"
        target={() => 'test'}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    ).toJSON();

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
      const customStyle = { color: 'red' };
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

  it('should trap and restore focus', (done) => {
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

    expect(portal.instance().tether).toBeNull();
    expect(storeFocus).not.toHaveBeenCalled();
    expect(scopeFocus).not.toHaveBeenCalled();
    expect(restoreFocus).not.toHaveBeenCalled();
    expect(unscopeFocus).not.toHaveBeenCalled();

    portal.setProps({ isOpen: true }, () => {
      expect(storeFocus).toHaveBeenCalled();
      expect(scopeFocus).toHaveBeenCalled();

      portal.setProps({ isOpen: false }, () => {
        expect(restoreFocus).toHaveBeenCalled();
        expect(unscopeFocus).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should reposition when props are updated', (done) => {
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

    portal.setProps({ isOpen: true }, () => {
      expect(portal.instance().position.mock.calls.length).toBe(1);
      portal.setProps({ target: <div>another target</div> }, () => {
        expect(portal.instance().position.mock.calls.length).toBe(2);
        done();
      });
    });
  });

  it('should not reposition if not open', (done) => {
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

    portal.setProps({ isOpen: false }, () => {
      expect(portal.instance().position.mock.calls.length).toBe(0);
      done();
    });
  });

  it('should not create multiple tether instances when repositioning', (done) => {
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

    const { tether } = portal.instance();

    portal.setProps({ target: <div>another target</div> }, () => {
      expect(portal.instance().tether).toBe(tether);
      done();
    });
  });
});
