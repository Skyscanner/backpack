import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('tether');

/* eslint-disable import/first */
import BpkPopoverPortal from './BpkPopoverPortal';
/* eslint-enable */

describe('BpkPopoverPortal', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkPopoverPortal
        target={<div>target</div>}
        isOpen
        onClose={() => null}
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
