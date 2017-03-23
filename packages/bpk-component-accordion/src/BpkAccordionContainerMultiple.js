import React, { PropTypes, Component, Children, cloneElement } from 'react';

import BpkAccordion from './BpkAccordion';

const getInitiallyExpanded = (children) => {
  const accordionItems = Children.toArray(children);
  const filtered = accordionItems.filter(item => item.props.expanded);

  return filtered.map(({ key }) => key);
};

class BpkAccordionContainerMultiple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: getInitiallyExpanded(this.props.children),
    };

    this.toggleAccordionItem = this.toggleAccordionItem.bind(this);
    this.renderAccordionItem = this.renderAccordionItem.bind(this);
  }

  toggleAccordionItem(key) {
    this.setState(({ expanded }) => {
      const newState = expanded.slice(0);
      const index = newState.indexOf(key);

      if (index === -1) {
        newState.push(key);
      } else {
        newState.splice(index, 1);
      }

      return { expanded: newState };
    });
  }

  renderAccordionItem(accordionItem) {
    const expanded = this.state.expanded.indexOf(accordionItem.key) !== -1;
    const onClick = () => this.toggleAccordionItem(accordionItem.key);

    return cloneElement(accordionItem, { expanded, onClick });
  }

  render() {
    const { children } = this.props;

    return (
      <BpkAccordion>
        {Children.toArray(children).map(this.renderAccordionItem)}
      </BpkAccordion>
    );
  }
}

BpkAccordionContainerMultiple.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkAccordionContainerMultiple;
