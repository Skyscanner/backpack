jest.mock('react-addons-css-transition-group');

/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import BpkModalDialog from './BpkModalDialog';
/* eslint-enable */

describe('BpkModalDialog', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalDialog
        title="Modal title"
        onClose={() => null}
        getApplicationElement={() => null}
      >
        Modal content
      </BpkModalDialog>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
