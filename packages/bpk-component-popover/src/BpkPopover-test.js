import React from 'react';
import renderer from 'react-test-renderer';
import BpkPopover from './BpkPopover';

describe('BpkPopover', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkPopover
        onClose={() => null}
        closeButtonText="Close"
      >
        My popover content
      </BpkPopover>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const tree = renderer.create(
      <BpkPopover
        onClose={() => null}
        closeButtonText="Close"
        padded={false}
      >
        My popover content
      </BpkPopover>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkPopover
        onClose={() => null}
        closeButtonText="Close"
        className="my-custom-class"
      >
        My popover content
      </BpkPopover>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
