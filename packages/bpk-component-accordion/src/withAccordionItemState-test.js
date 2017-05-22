import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BpkAccordionItem from './BpkAccordionItem';
import withAccordionItemState from './withAccordionItemState';

const EnhancedComponent = withAccordionItemState(BpkAccordionItem);

describe('withAccordionItemState(BpkAccordionItem)', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <EnhancedComponent id="my-accordion" title="My accordion item">
        My accordion content
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "expanded" prop', () => {
    const tree = renderer.create(
      <EnhancedComponent id="my-accordion" title="My accordion item" expanded>
        My accordion content
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "initiallyExpanded" prop', () => {
    const tree = renderer.create(
      <EnhancedComponent id="my-accordion" title="My accordion item" initiallyExpanded>
        My accordion content
      </EnhancedComponent>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should toggle "expanded" on click', () => {
    const accordionItem = shallow(
      <EnhancedComponent id="my-accordion" title="My accordion item" initiallyExpanded>
        My accordion content
      </EnhancedComponent>,
    );

    expect(accordionItem.state('expanded')).toBe(true);

    accordionItem.instance().onClick();
    expect(accordionItem.state('expanded')).toBe(false);

    accordionItem.instance().onClick();
    expect(accordionItem.state('expanded')).toBe(true);
  });
});
