import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

jest.mock('tether');
jest.mock('a11y-focus-store', () => ({
  storeFocus: jest.fn(),
  restoreFocus: jest.fn(),
}));
jest.mock('a11y-focus-scope', () => ({
  scopeFocus: jest.fn(),
  unscopeFocus: jest.fn(),
}));

/* eslint-disable import/first */
import BpkPopoverPortal from './BpkPopoverPortal';
/* eslint-enable */

describe('BpkPopoverPortal', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen={false}
        onClose={() => null}
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should trap and restore focus', (done) => {
    const focusStore = require('a11y-focus-store'); // eslint-disable-line global-require
    const focusScope = require('a11y-focus-scope'); // eslint-disable-line global-require

    const portal = mount(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen={false}
        onClose={() => null}
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );

    expect(portal.instance().tether).toBeNull();
    expect(focusStore.storeFocus).not.toHaveBeenCalled();
    expect(focusScope.scopeFocus).not.toHaveBeenCalled();
    expect(focusStore.restoreFocus).not.toHaveBeenCalled();
    expect(focusScope.unscopeFocus).not.toHaveBeenCalled();

    portal.setProps({ isOpen: true }, () => {
      expect(focusStore.storeFocus).toHaveBeenCalled();
      expect(focusScope.scopeFocus).toHaveBeenCalled();

      portal.setProps({ isOpen: false }, () => {
        expect(focusStore.restoreFocus).toHaveBeenCalled();
        expect(focusScope.unscopeFocus).toHaveBeenCalled();
        done();
      });
    });
  });
});
