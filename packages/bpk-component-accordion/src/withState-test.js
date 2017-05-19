import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import withState from './withState';
import BpkAccordionItem from './BpkAccordionItem';

const StatefulBpkAccordionItem = withState(BpkAccordionItem);

describe('withState', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <StatefulBpkAccordionItem id="my-accordion" title="My accordion item">
        My accordion content
      </StatefulBpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "expanded" prop', () => {
    const tree = renderer.create(
      <StatefulBpkAccordionItem id="my-accordion" title="My accordion item" expanded>
        My accordion content
      </StatefulBpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "initiallyExpanded" prop', () => {
    const tree = renderer.create(
      <StatefulBpkAccordionItem id="my-accordion" title="My accordion item" initiallyExpanded>
        My accordion content
      </StatefulBpkAccordionItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should toggle "expanded" on click', () => {
    const accordionItem = shallow(
      <StatefulBpkAccordionItem id="my-accordion" title="My accordion item" initiallyExpanded>
        My accordion content
      </StatefulBpkAccordionItem>,
    );

    expect(accordionItem.state('expanded')).toBe(true);

    accordionItem.instance().onClick();
    expect(accordionItem.state('expanded')).toBe(false);

    accordionItem.instance().onClick();
    expect(accordionItem.state('expanded')).toBe(true);
  });
});
