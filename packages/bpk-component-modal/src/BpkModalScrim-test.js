jest.mock('react-addons-css-transition-group');

/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import BpkModalScrim from './BpkModalScrim';
/* eslint-enable */

describe('BpkModalScrim', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalScrim />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
