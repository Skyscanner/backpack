import React from 'react';
import renderer from 'react-test-renderer';

import BpkAccordionItem from './BpkAccordionItem';

describe('BpkAccordionItem', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkAccordionItem id="my-accordion" title="My accordion item">
        My accordion content
      </BpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "expanded" prop', () => {
    const tree = renderer.create(
      <BpkAccordionItem id="my-accordion" title="My accordion item" expanded>
        My accordion content
      </BpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" prop', () => {
    const tree = renderer.create(
      <BpkAccordionItem id="my-accordion" title="My accordion item" className="my-custom-class">
        My accordion content
      </BpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
