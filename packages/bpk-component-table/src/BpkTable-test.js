import React from 'react';
import renderer from 'react-test-renderer';
import BpkTable from './BpkTable';

describe('BpkTable', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTable>
        <tbody />
      </BpkTable>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
