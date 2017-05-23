import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BpkAccordion from './BpkAccordion';
import withSingleItemAccordionState from './withSingleItemAccordionState';

const EnhancedComponent = withSingleItemAccordionState(BpkAccordion);

describe('withSingleItemAccordionState(BpkAccordion)', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom initially expanded item', () => {
    const tree = renderer.create(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly even when multiple items are marked as initially expanded', () => {
    const tree = renderer.create(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div initiallyExpanded>Accordion Item 3</div>
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should update "expanded" value with key of clicked child', () => {
    const accordionContainer = shallow(
      <EnhancedComponent>
        <div>Accordion Item 1</div>
        <div initiallyExpanded>Accordion Item 2</div>
        <div>Accordion Item 3</div>
      </EnhancedComponent>,
    );

    expect(accordionContainer.state('expanded')).toEqual('.1');

    accordionContainer.findWhere(e => e.text() === 'Accordion Item 1').first().prop('onClick')();
    expect(accordionContainer.state('expanded')).toEqual('.0');

    accordionContainer.findWhere(e => e.text() === 'Accordion Item 3').first().prop('onClick')();
    expect(accordionContainer.state('expanded')).toEqual('.2');
  });
});
