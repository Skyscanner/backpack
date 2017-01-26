import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';

import Portal from './Portal';

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

    portal.instance().onDocumentClick({
      button: 1,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentClick({
      button: 0,
      target: portal.instance().getTargetElement(),
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentClick({
      button: 0,
      target: portal.instance().portalElement,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(0);

    portal.instance().onDocumentClick({
      button: 0,
    });
    expect(onCloseSpy.mock.calls.length).toEqual(1);
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

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);
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

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
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

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);

    unmountComponentAtNode(mountPoint);

    document.dispatchEvent(event);

    expect(onCloseSpy.mock.calls.length).toEqual(1);
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
    // - componentDidUpdate, as we'd have to mock react-dom render()
    // - componentWillUnmount, as it takes forever and slows down the test suite immensely
  });
});
