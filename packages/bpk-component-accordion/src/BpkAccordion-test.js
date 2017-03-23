import React from 'react';
import renderer from 'react-test-renderer';

import BpkAccordion from './BpkAccordion';

describe('BpkAccordion', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkAccordion>
        Accordion child
      </BpkAccordion>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const tree = renderer.create(
      <BpkAccordion className="my-custom-class">
        Accordion child
      </BpkAccordion>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
