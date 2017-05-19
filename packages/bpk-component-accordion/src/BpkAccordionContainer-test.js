import React from 'react';
import renderer from 'react-test-renderer';

import BpkAccordionContainer from './BpkAccordionContainer';

describe('BpkAccordionContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkAccordionContainer>
        <div>Accordion Item 1</div>
        <div>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </BpkAccordionContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom initially expanded item', () => {
    const tree = renderer.create(
      <BpkAccordionContainer>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </BpkAccordionContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly even when multiple items are marked as initially expanded', () => {
    const tree = renderer.create(
      <BpkAccordionContainer>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div initiallyExpanded>Accordion Item 3</div>
      </BpkAccordionContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
