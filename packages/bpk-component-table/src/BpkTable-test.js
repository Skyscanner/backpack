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

  it('should render correctly with custom class', () => {
    const tree = renderer.create(
      <BpkTable
        className="my-table"
      >
        <tbody />
      </BpkTable>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
