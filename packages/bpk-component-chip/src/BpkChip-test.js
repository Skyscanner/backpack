import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkChip from './BpkChip';

describe('BpkChip', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkChip onClose={() => null} >This is a Chip!</BpkChip>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
