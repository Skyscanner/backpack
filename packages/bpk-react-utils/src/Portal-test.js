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
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';

import Portal from './Portal';

const KEYCODES = {
  ESCAPE: 27,
};

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

  it('should render correctly with renderTarget', () => {
    const div = document.createElement('div');
    const tree = renderer.create(
      <Portal isOpen renderTarget={div}>
        <div>My portal content</div>
      </Portal>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(div).toMatchSnapshot();
  });

  it('should render with a custom style property', (done) => {
    const customStyle = { color: 'red' };
    const assertion = (portalElement) => {
      expect(portalElement.style.color).toEqual(customStyle.color);
      done();
    };

    mount(
      <Portal isOpen onOpen={assertion} style={customStyle}>
        <div>My portal content</div>
      </Portal>,
    );
  });

  it('should render with a custom className property', (done) => {
    const customClassname = 'my-custom-classname';
    const assertion = (portalElement) => {
      expect(portalElement.classList.contains(customClassname)).toBe(true);
      done();
    };

    mount(
      <Portal isOpen onOpen={assertion} className={customClassname}>
        <div>My portal content</div>
      </Portal>,
    );
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

  it('should remove portal children from document.body on close', (done) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('Not a portal'));
    document.body.appendChild(div);

    expect(document.body.lastChild.textContent).toEqual('Not a portal');

    const portal = mount(
      <Portal isOpen>
        <div>My portal content</div>
      </Portal>,
    );

    expect(document.body.lastChild.textContent).toEqual('My portal content');

    portal.setProps({ isOpen: false }, () => {
      expect(document.body.lastChild.textContent).toEqual('Not a portal');
      done();
    });
  });

  it('should call the onClose handler on click outside', () => {
    const onCloseSpy = jest.fn();

    const portal = mount(
      <Portal isOpen onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentMouseDown({
      button: 1,
    });
    portal.instance().onDocumentMouseUp({
      button: 1,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentMouseDown({
      button: 0,
      target: portal.instance().getTargetElement(),
    });
    portal.instance().onDocumentMouseUp({
      button: 0,
      target: portal.instance().getTargetElement(),
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentMouseDown({
      button: 0,
      target: portal.instance().portalElement,
    });
    portal.instance().onDocumentMouseUp({
      button: 0,
      target: portal.instance().portalElement,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentMouseDown({
      button: 0,
    });
    portal.instance().onDocumentMouseUp({
      button: 0,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(1);
  });

  it('should propagate the click event to the onClose handler', () => {
    const onCloseSpy = jest.fn();

    const portal = mount(
      <Portal isOpen onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = {
      button: 0,
    };
    portal.instance().onDocumentMouseDown(event);
    portal.instance().onDocumentMouseUp(event);

    expect(onCloseSpy.mock.calls[0][0]).toEqual(event);
    expect(onCloseSpy.mock.calls[0][1]).toEqual({ source: 'DOCUMENT_CLICK' });
  });

  it('should call the onClose handler on escape key', () => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);

    const onCloseSpy = jest.fn();

    render(
      <Portal isOpen onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
      mountPoint,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = new KeyboardEvent('keydown', { keyCode: KEYCODES.ESCAPE });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);
  });

  it('should propagate the escape key event to the onClose handler', () => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);

    const onCloseSpy = jest.fn();

    render(
      <Portal isOpen onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
      mountPoint,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = new KeyboardEvent('keydown', { keyCode: KEYCODES.ESCAPE });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls[0][0]).toEqual(event);
    expect(onCloseSpy.mock.calls[0][1]).toEqual({ source: 'ESCAPE' });
  });

  it('should not call the onClose handler on escape key if portal is closed', () => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);

    const onCloseSpy = jest.fn();

    render(
      <Portal isOpen={false} onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
      mountPoint,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = new KeyboardEvent('keydown', { keyCode: KEYCODES.ESCAPE });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(0);
  });

  it('should not call the onClose handler again on escape key if portal is unmounted', () => {
    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);

    const onCloseSpy = jest.fn();

    render(
      <Portal isOpen onClose={onCloseSpy} target={<div>target</div>}>
        <div>My portal content</div>
      </Portal>,
      mountPoint,
    );

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = new KeyboardEvent('keydown', { keyCode: KEYCODES.ESCAPE });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);

    unmountComponentAtNode(mountPoint);

    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);
  });

  it('should call the onRender handler when props are updated', (done) => {
    const onRenderSpy = jest.fn();

    const portal = mount(
      <Portal isOpen onRender={onRenderSpy}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy.mock.calls.length).toBe(1);

    portal.setProps({ target: <div>target1</div> }, () => {
      expect(onRenderSpy.mock.calls.length).toBe(2);
      portal.setProps({ target: <div>target2</div> }, () => {
        expect(onRenderSpy.mock.calls.length).toBe(3);
        done();
      });
    });
  });

  it('should call the onRender handler before the onOpen handler handler when props are updated', () => {
    let order = 0;
    const onRender = () => { order = 1; };
    const onOpen = () => { order = 2; };
    const portal = mount(
      <Portal isOpen={false} onRender={onRender} onOpen={onOpen}>
        <div>My portal content</div>
      </Portal>,
    );
    portal.setProps({ isOpen: true }, () => {
      expect(order).toBe(2);
    });
  });

  it('should call the onRender handler before the onOpen handler handler when component is mounted', () => {
    let order = 0;
    const onRender = () => { order = 1; };
    const onOpen = () => { order = 2; };
    mount(
      <Portal isOpen onRender={onRender} onOpen={onOpen}>
        <div>My portal content</div>
      </Portal>,
    );
    expect(order).toBe(2);
  });

  it('should not call the onRender handler when isOpen is false', (done) => {
    const onRenderSpy = jest.fn();

    const portal = mount(
      <Portal isOpen={false} onRender={onRenderSpy}>
        <div>My portal content</div>
      </Portal>,
    );

    expect(onRenderSpy.mock.calls.length).toBe(0);

    portal.setProps({ isOpen: true }, () => {
      expect(onRenderSpy.mock.calls.length).toBe(1);
      portal.setProps({ isOpen: false }, () => {
        expect(onRenderSpy.mock.calls.length).toBe(1);
        done();
      });
    });
  });

  describe('lifecycle methods', () => {
    let portal;
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    const beforeCloseSpy = jest.fn();

    beforeAll(() => {
      Portal.prototype.open = openSpy;
      Portal.prototype.close = closeSpy;

      portal = mount(
        <Portal isOpen>
          <div>My portal content</div>
        </Portal>,
      );
    });

    describe('componentDidMount()', () => {
      it('should open the portal on mount', () => {
        expect(openSpy.mock.calls.length).toEqual(1);
      });
    });

    describe('componentWillReceiveProps()', () => {
      it('should close the portal when isOpen is removed', (done) => {
        portal.setProps({ isOpen: false }, () => {
          expect(closeSpy.mock.calls.length).toEqual(1);
          done();
        });
      });

      it('should open the portal again when isOpen is added', (done) => {
        portal.setProps({ isOpen: true }, () => {
          expect(openSpy.mock.calls.length).toEqual(2);
          done();
        });
      });

      it('should call beforeClose when isOpen is removed', (done) => {
        portal.setProps({ beforeClose: beforeCloseSpy, isOpen: false }, () => {
          expect(beforeCloseSpy.mock.calls.length).toEqual(1);
          done();
        });
      });
    });

    // No tests for
    // - renderPortal, as we'd have to mock react-dom render()
    // - componentWillUnmount, as it takes forever and slows down the test suite immensely
  });
});
